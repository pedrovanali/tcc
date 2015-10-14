package com.pucpr.br.bsi2015.tcc.selfiecode.controller;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import org.eclipse.core.resources.IMarker;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.jdt.core.IJavaElement;
import org.eclipse.jdt.core.IJavaProject;
import org.json.JSONObject;

import com.pucpr.br.bsi2015.tcc.selfiecode.filecontroller.FileController;
import com.pucpr.br.bsi2015.tcc.selfiecode.model.ProjectTime;

import net.sourceforge.metrics.core.sources.AbstractMetricSource;

public class ThreadMetricsControl extends Thread {
	IJavaElement currentElm;
	private Object o = null;
	private ProjectTime pr;
	public ThreadMetricsControl(IJavaElement currentElm) {
		super("Controle de Projetos");
		this.currentElm = currentElm;
	}

	// public ThreadMetricsControl() {
	// super("Controle de Projetos");
	//
	// }
	//
	public void run() {
		System.out.println("Thread startou");
		String fileName = "";

		String info[];
		if (o == null) {
			try {
				wait();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			Object timeProject = currentElm.getJavaProject();
			if (timeProject instanceof IJavaProject) {
				IJavaProject nameProject = (IJavaProject) timeProject;
				SessionController s = SessionController.getInstance();
				Map<Integer, ProjectTime> projetos = s.getSession().getProjetos();
				ProjectTime pr = null;
				Iterator<Map.Entry<Integer, ProjectTime>> entries = projetos.entrySet().iterator();
				while (entries.hasNext()) {
					Map.Entry<Integer, ProjectTime> thisEntry = entries.next();
					
					ProjectTime value =  thisEntry.getValue();
					if (value.getNomeProjeto() != null && value.getNomeProjeto().equals(nameProject.getElementName())) {
						pr = value;
					}
					// ...
				}
				if (pr != null && pr.getInterval() < 0)
					this.pr = pr;
				else {
					return;
				}

				// System.out.println("tem o");
				AbstractMetricSource c = (AbstractMetricSource) o;
				FileController fc = new FileController();
				// workspace.getRoot().getFullPath().toString();
				fileName = fc.saveZip(ResourcesPlugin.getWorkspace().getRoot().getLocation().toString()
						+ currentElm.getJavaProject().getPath().toOSString() + "/src/");

				MetricsController mc = MetricsController.getInstance();
				// FileController.getInstance().saveZip(currentElm.getResource().getLocation().toOSString());
				try {
					info = fileName.split("#:@:@:#");
					String result = mc.dicas(c, info[0], info[1], currentElm);
					if (result.equals("naoachou")) {
						Object firstElement = currentElm.getJavaProject();
						if (firstElement instanceof IJavaProject) {
							IJavaProject type = (IJavaProject) firstElement;
							writeMarkers(type, "Projeto inexistente n�o foi possivel verificar as m�tricas");

							// for nested objects iteration if required

						}
						return;
					}
					// mc.uploadFile(fc.getFilePath());

					JSONObject json = new JSONObject(result);
					Iterator<String> iter = json.keys();
					while (iter.hasNext()) {
						String key = iter.next();

						// Print key and value
						String value = json.getString(key);
						Object firstElement = currentElm.getJavaProject();
						if (firstElement instanceof IJavaProject) {
							IJavaProject type = (IJavaProject) firstElement;
							writeMarkers(type, value);

							// for nested objects iteration if required

						}
					}
					
					if(this.pr != null)
					{
						MetricsController.getInstance().setPr(this.pr);
					}

				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}

		}
	}
	
	
	private void writeMarkers(IJavaProject type, String message) {
		try {
			IResource resource = type.getUnderlyingResource();
			IMarker marker = resource.createMarker(IMarker.PROBLEM);
			marker.setAttribute(IMarker.MESSAGE, message);

			// marker.setAttribute(IMarker.PRIORITY, IMarker.PRIORITY_NORMAL);
			marker.setAttribute(IMarker.SEVERITY, IMarker.SEVERITY_INFO);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void setMetricsList(Object o) {
		this.o = o;
	}
}
