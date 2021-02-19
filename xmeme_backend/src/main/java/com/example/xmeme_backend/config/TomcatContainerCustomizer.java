package com.example.xmeme_backend.config;

import org.apache.catalina.connector.Connector;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;


@Component
public class TomcatContainerCustomizer implements WebServerFactoryCustomizer<TomcatServletWebServerFactory> {
    @Value("${swagger.port}")
    private int swaggerPort;

    @Value("${swagger.paths}")
    private List<String> swaggerPaths;

    @Override
    public void customize(TomcatServletWebServerFactory factory) {

        Connector swaggerConnector = new Connector();
        swaggerConnector.setPort(swaggerPort);
        System.out.println(swaggerPort);
        factory.addAdditionalTomcatConnectors(swaggerConnector);
    }
    @Bean
    public FilterRegistrationBean<SwaggerFilter> swaggerFilterRegistrationBean() {

        FilterRegistrationBean<SwaggerFilter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new SwaggerFilter());
        filterRegistrationBean.setOrder(-100);
        filterRegistrationBean.setName("SwaggerFilter");

        return filterRegistrationBean;
    }

    private class SwaggerFilter extends OncePerRequestFilter {

        private AntPathMatcher pathMatcher = new AntPathMatcher();

        @Override
        protected void doFilterInternal(HttpServletRequest httpServletRequest,
                                        HttpServletResponse httpServletResponse,
                                        FilterChain filterChain) throws ServletException, IOException {
            System.out.println(swaggerPaths);
            boolean isSwaggerPath = swaggerPaths.stream()
                    .anyMatch(path -> pathMatcher.match(path, httpServletRequest.getServletPath()));
            boolean isSwaggerPort = httpServletRequest.getLocalPort() == swaggerPort;

            if(isSwaggerPath == isSwaggerPort) {
                filterChain.doFilter(httpServletRequest, httpServletResponse);
            } else {
                httpServletResponse.sendError(404);
            }
        }
    }



}
