package com.monitor.demo.controller;

import com.monitor.demo.common.ServerResponse;
import com.monitor.demo.entity.Server;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 服务器监控
 * 
 * @author gaofujie
 */
@RestController
@RequestMapping("/api/monitor")
public class ServerController {

    @GetMapping("/server")
    public ServerResponse<Server> server() throws Exception {
        Server server = new Server();
        server.copyTo();
        return ServerResponse.createBySuccess(server);
    }
}
