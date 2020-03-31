package com.ssm.controller;

import com.ssm.pojo.User;
import com.ssm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author csdn
 */
@RestController
public class UserController{

    @Autowired
    private UserService userService;

    @RequestMapping("get")
    public List<User> getUserListByName(@RequestParam String userName) {
        List<User> userListByName = userService.getUserListByName(userName);
        return userListByName;
    }

    @RequestMapping("add")
    public int add(User user) {
        return userService.add(user);
    }

    @RequestMapping("delete")
    public int deleteUserById(@RequestParam Integer id) {
        return userService.deleteUserById(id);
    }
}

