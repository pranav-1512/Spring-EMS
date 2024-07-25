package com.example.ems.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ems.dto.DepartmentDto;
import com.example.ems.entity.Department;
import com.example.ems.exception.ResourceNotFound;
import com.example.ems.repository.DepartmentRepository;
import com.example.ems.mapper.*;

@Service
public class DepartmentServiceImpl implements DepartmentService{
	
	@Autowired
	DepartmentRepository deptRepository;

	@Override
	public DepartmentDto createDepartment(DepartmentDto deptDto) {
//		Department dept = new Department(deptDto.getId(), deptDto.getDeptName(), deptDto.getDeptLoc());
		Department dept = DepartmentMapper.mapToDepartment(deptDto);
		Department savedDept = deptRepository.save(dept);
		return DepartmentMapper.mapToDepartmentDto(savedDept);
	}

	@Override
	public List<DepartmentDto> getDepartments() {
		List<Department> dept = deptRepository.findAll();
		List<DepartmentDto> deptDto = new ArrayList<>();
		for(Department i:dept) {
			deptDto.add(DepartmentMapper.mapToDepartmentDto(i));
		}
		return deptDto;
	}

	@Override
	public DepartmentDto getDepartmentById(Long deptId) {
		Department dept = deptRepository.findById(deptId)
				.orElseThrow(()->new ResourceNotFound("Department does not exist"));
		return DepartmentMapper.mapToDepartmentDto(dept);
	}

	@Override
	public DepartmentDto updateDepartment(Long deptId, DepartmentDto deptDto) {
		Department dept = deptRepository.findById(deptId)
				.orElseThrow(()->new ResourceNotFound("Department does not exist"));
		
		if(deptDto.getDeptName()!=null) {
			dept.setDeptName(deptDto.getDeptName());
		}
		if(deptDto.getDeptLoc()!=null) {
			dept.setDeptLoc(deptDto.getDeptLoc());
		}
		Department updatedDept = deptRepository.save(dept);
		return DepartmentMapper.mapToDepartmentDto(updatedDept);
	}

	@Override
	public void deleteDepartment(Long deptId) {
		Department dept = deptRepository.findById(deptId)
				.orElseThrow(()->new ResourceNotFound("Department not found"));
		
		deptRepository.deleteById(deptId);
		
	}


}
