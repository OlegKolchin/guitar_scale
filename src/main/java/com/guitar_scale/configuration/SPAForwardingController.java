package com.guitar_scale.configuration;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SPAForwardingController {

    @RequestMapping(value = "/**/{path:^(?!.*\\.).*$}")
    public String forward() {
        return "forward:/index.html";
    }
}