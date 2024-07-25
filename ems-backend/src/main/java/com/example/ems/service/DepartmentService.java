package com.example.ems.service;

import java.util.List;

import com.example.ems.dto.DepartmentDto;

public interface DepartmentService {
	
	DepartmentDto createDepartment(DepartmentDto deptDto);
	
	List<DepartmentDto> getDepartments();
	
	DepartmentDto getDepartmentById(Long deptId);
	
	DepartmentDto updateDepartment(Long deptId, DepartmentDto deptDto);
	
	void deleteDepartment(Long deptId);


}
