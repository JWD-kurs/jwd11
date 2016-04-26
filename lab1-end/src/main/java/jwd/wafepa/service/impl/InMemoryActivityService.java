package jwd.wafepa.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jwd.wafepa.model.Activity;
import jwd.wafepa.service.ActivityService;

public class InMemoryActivityService implements ActivityService {
	private Map<Long, Activity> activities = 
			new HashMap<>();
	private long nextId = 1L;
	
	public Activity findOne(Long id) {
		
		return activities.get(id);
	}

	public List<Activity> findAll() {
		
		return (List<Activity>) activities.values();
	}

	public Activity save(Activity activity) {
		if(activity.getId()==null){
			activity.setId(nextId++);
		}
		activities.put(activity.getId(), activity);
		return activity;
	}

	public Activity delete(Long id) {
		Activity activity = activities.get(id);
		if(activity == null){
			throw new IllegalArgumentException(
					"Tried to remove non-existant activity");
		}
		activities.remove(id);
		activity.setId(null);
		return activity;
	}

}
