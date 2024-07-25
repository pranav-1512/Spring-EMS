package com.example.ems.mapper;

import com.example.ems.dto.EmployeeDto;
import com.example.ems.entity.Employee;

public class EmployeeMapper {
    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto(
            employee.getId(),
            employee.getFirstname(),
            employee.getLastname(),
            employee.getEmail()
        );
    }

    public static Employee maptToEmployee(EmployeeDto employeeDto) {
        return new Employee(
            employeeDto.getId(),
            employeeDto.getFirstname(),
            employeeDto.getLastname(),
            employeeDto.getEmail()
        );
    }
}