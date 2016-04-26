package jwd.wafepa.service;

import jwd.wafepa.model.Activity;
import jwd.wafepa.service.impl.InMemoryActivityService;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class InMemoryActivityServiceTest {
	private ActivityService activityService;
	
	
	@Before
	public void setUp(){
		activityService = new InMemoryActivityService();
		
		activityService.save(new Activity("Swimming"));
		activityService.save(new Activity("Running"));
	}
	
	@After
	public void tearDown(){
		
	}
	
	@Test
	public void testFindOne(){
		Activity swimming = activityService.findOne(1L);
		Assert.assertNotNull(swimming);
		Assert.assertEquals("Swimming", swimming.getName());
	}
	
}
