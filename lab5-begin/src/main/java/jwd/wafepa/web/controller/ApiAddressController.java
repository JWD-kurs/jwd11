package jwd.wafepa.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import jwd.wafepa.model.Address;
import jwd.wafepa.service.AddressService;

@Controller
@RequestMapping("/api/addresses")
public class ApiAddressController {
	@Autowired
	private AddressService addressService;

	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List<Address>> get(){
		List<Address> addresses = addressService.findAll();
		
		return new ResponseEntity<List<Address>>(
				addresses, 
				HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<Address> get(@PathVariable Long id){
		Address address = addressService.findOne(id);
		
		return new ResponseEntity<Address>(
				address, 
				HttpStatus.OK);
	}
	
	@RequestMapping(
			method=RequestMethod.POST,
			consumes="application/json")
	public ResponseEntity<Address> add(
			@RequestBody Address newAddress){
		
		Address persisted = addressService.save(newAddress);
		
		return new ResponseEntity<>(
				persisted, 
				HttpStatus.CREATED);
	}
	
	@RequestMapping(
			value="/{id}",
			method=RequestMethod.PUT,
			consumes="application/json")
	public ResponseEntity<Address> edit(
		@PathVariable Long id,
		@RequestBody Address editedAddress){
	
		if(id==null || !id.equals(editedAddress.getId())){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		Address persisted = addressService.save(editedAddress);
		
		return new ResponseEntity<>(
				persisted,
				HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}",method=RequestMethod.DELETE)
	public ResponseEntity<Address> delete(
			@PathVariable Long id){
		
		addressService.delete(id);
		
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
