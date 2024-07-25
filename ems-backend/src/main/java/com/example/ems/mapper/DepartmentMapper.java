package com.example.ems.mapper;

import com.example.ems.dto.DepartmentDto;
import com.example.ems.entity.Department;

public class DepartmentMapper {
	
	public static Department mapToDepartment(DepartmentDto deptDto) {
		return new Department(deptDto.getId(), deptDto.getDeptName(),deptDto.getDeptLoc());
	}
	
	public static DepartmentDto mapToDepartmentDto(Department dept) {
		return new DepartmentDto(dept.getId(), dept.getDeptName(), dept.getDeptLoc());
	}
}
