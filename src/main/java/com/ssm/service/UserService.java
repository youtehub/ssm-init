package com.ssm.service;

import com.ssm.pojo.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author csdn
 */
public interface UserService {
    /**
     * 查询用户列表(参数：User对象入参)
     *
     * @param userName
     * @return
     */
    List<User> getUserListByName(@Param("userName") String userName);

    /**
     * 新增用户
     *
     * @param user
     * @return
     */
    int add(User user);

    /**
     * 删除用户信息
     *
     * @param id
     * @return
     */
    int deleteUserById(Integer id);
}

