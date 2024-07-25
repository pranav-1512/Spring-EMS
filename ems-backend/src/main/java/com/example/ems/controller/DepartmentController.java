package com.example.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.ems.dto.DepartmentDto;
import com.example.ems.service.DepartmentService;

@RestController
@RequestMapping("/api/department")
public class DepartmentController {
	
	@Autowired
	DepartmentService departmentService;
	
	@PostMapping
	public ResponseEntity<DepartmentDto> createDepatment(@RequestBody DepartmentDto deptDto) {
		DepartmentDto savedDeptDto = departmentService.createDepartment(deptDto);
		return new ResponseEntity<>(savedDeptDto, HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<DepartmentDto>> getDepartments(){
		List<DepartmentDto> departments = departmentService.getDepartments();
		return ResponseEntity.ok(departments);
	}
	
	@GetMapping("{deptId}")
	public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable Long deptId){
		DepartmentDto deptDto = departmentService.getDepartmentById(deptId);
		return ResponseEntity.ok(deptDto);
	}
	
	@PutMapping("{deptId}")
	public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable Long deptId, @RequestBody DepartmentDto deptDto){
		DepartmentDto updated = departmentService.updateDepartment(deptId, deptDto);
		return ResponseEntity.ok(updated);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteDepartment(@PathVariable("id") Long deptId){
		departmentService.deleteDepartment(deptId);
		return ResponseEntity.ok("Department Deleted Successfully");
	}

}
