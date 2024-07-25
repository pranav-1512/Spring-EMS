package com.example.ems.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ems.dto.EmployeeDto;
import com.example.ems.entity.Employee;
import com.example.ems.exception.ResourceNotFound;
import com.example.ems.mapper.EmployeeMapper;
import com.example.ems.repository.EmployeeRepository;


@Service
public class EmployeeServiceImpl implements EmployeeService {
	
	@Autowired
	private EmployeeRepository employeeRepository;

	@Override
	public EmployeeDto createEmployee(EmployeeDto employeeDto) {
		Employee employee =EmployeeMapper.maptToEmployee(employeeDto);
		Employee savedEmployee = employeeRepository.save(employee);
		return EmployeeMapper.mapToEmployeeDto(savedEmployee);
	}

	@Override
	public List<EmployeeDto> getEmployees() {
		List<EmployeeDto> response = new ArrayList<>();
		List<Employee> employees = employeeRepository.findAll();
		for(Employee i:employees) {
			response.add(EmployeeMapper.mapToEmployeeDto(i));
		}
		return response;
	}

	@Override
	public EmployeeDto getEmployeeById(Long employeeId) {
		Employee employee = employeeRepository.findById(employeeId)
				.orElseThrow(()->new ResourceNotFound("Employee does not exist with id"+employeeId));
		return EmployeeMapper.mapToEmployeeDto(employee);
	}

	@Override
	public EmployeeDto updateEmployee(Long employeeId, EmployeeDto employeeDto) {
		Employee employee = employeeRepository.findById(employeeId)
				.orElseThrow(()->new ResourceNotFound("Employee does not exist"));
		
		if (employeeDto.getEmail() != null) {
	        employee.setEmail(employeeDto.getEmail());
	    }
	    if (employeeDto.getFirstname() != null) {
	        employee.setFirstname(employeeDto.getFirstname());
	    }
	    if (employeeDto.getLastname() != null) {
	        employee.setLastname(employeeDto.getLastname());
	    }
		
		Employee updatedEmployee = employeeRepository.save(employee);
		
		return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
	}

	@Override
	public void deleteEmployee(Long employeeId) {
		Employee employee = employeeRepository.findById(employeeId)
				.orElseThrow(()->new ResourceNotFound("Employee does not exist"));
		
		employeeRepository.deleteById(employeeId);
		
		
	}



}
