package com.monitor.demo.common;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;

public class ServerResponse<T> implements Serializable {

    private String status;
    private String code;
    private String msg;
    private T data;


    private ServerResponse(String status) {
        this.status = status;
    }

    private ServerResponse(String status, T data) {
        this.status = status;
        this.data = data;
    }

    private ServerResponse(String status, String msg, T data) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }

    private ServerResponse(String status, String msg) {
        this.status = status;
        this.msg = msg;
    }

    private ServerResponse(String status, String code, String msg) {
        this.status = status;
        this.msg = msg;
        this.code=code;
    }

    /**
     * 使之不在json序列化结果当中
     */
    @JsonIgnore
    public boolean isSuccess() {
        return "success".equals(this.status);
    }

    public String getStatus() {
        return status;
    }

    public T getData() {
        return data;
    }

    public String getMsg() {
        return msg;
    }

    public String getCode() {
        return code;
    }


    public static <T> ServerResponse<T> createBySuccess() {
        return new ServerResponse<>("success");
    }

    public static <T> ServerResponse<T> createBySuccessMessage(String msg) {
        return new ServerResponse<>("success", msg);
    }

    public static <T> ServerResponse<T> createBySuccess(T data) {
        return new ServerResponse<>("success", data);
    }

    public static <T> ServerResponse<T> createBySuccess(String msg, T data) {
        return new ServerResponse<>("success", msg, data);
    }

    public static <T> ServerResponse<T> createByError() {
        return new ServerResponse<>("error", "ERROR");
    }

    public static <T> ServerResponse<T> createByErrorMessage(String errorMessage) {
        return new ServerResponse<>("error", errorMessage);
    }

    public static <T> ServerResponse<T> createByErrorCodeMessage(String errorCode, String errorMessage) {
        return new ServerResponse<>("error",errorCode, errorMessage);
    }
}
