package com.example.ems.dto;

public class DepartmentDto {

	public DepartmentDto() {
		super();
	}

	public DepartmentDto(Long id, String deptName, String deptLoc) {
		super();
		this.id = id;
		this.deptName = deptName;
		this.deptLoc = deptLoc;
	}

	private Long id;
	
	private String deptName;
	
	private String deptLoc;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getDeptLoc() {
		return deptLoc;
	}

	public void setDeptLoc(String deptLoc) {
		this.deptLoc = deptLoc;
	}
}
