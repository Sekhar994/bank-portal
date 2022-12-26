package com.jwt.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "Users")
public class User {

	@Id
	private String username;
	private String email;
	private String password;
	private String role;
	private String balance;
	private String firstName;
	private String lastName;
	private String fatherName;
	private String motherName;
	private String phoneNumber;
	private String dateOfBirth;
	private String sex;
	private String adhaarCard;
	private String panCard;
	private String addressLine1;
	private String addressLine2;
}
