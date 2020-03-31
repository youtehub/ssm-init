package com.ssm.service.impl;

import com.ssm.dao.UserMapper;
import com.ssm.pojo.User;
import com.ssm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author csdn
 */
@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<User> getUserListByName(String userName) {
        return userMapper.getUserListByName(userName);
    }

    @Override
    public int add(User user) {
        return userMapper.add(user);
    }

    @Override
    public int deleteUserById(Integer id) {
        return userMapper.deleteUserById(id);
    }
}

