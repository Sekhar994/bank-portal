package com.jwt.Repository;

import com.jwt.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, String> {
	User findByEmail(String email);
}
