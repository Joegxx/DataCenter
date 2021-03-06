package com.chezhibao.bigdata.cache.redis.service.recommend;

import com.alibaba.dubbo.config.annotation.Service;
import com.chezhibao.bigdata.cache.bo.RedisApp;
import com.chezhibao.bigdata.cache.redis.adapter.AbstractRedisService;
import com.chezhibao.bigdata.dbms.redis.IRedisService;
import com.chezhibao.bigdata.dbms.redis.recommend.RecommendRedisService;
import org.springframework.stereotype.Component;

/**
 * @author WangCongJun
 * @date 2018/5/16
 * Created by WangCongJun on 2018/5/16.
 */
@Service(interfaceClass = RecommendRedisService.class)
@Component
public class RecommendRedisServiceImpl extends AbstractRedisService implements RecommendRedisService {

    private RedisApp redisApp;

    public RecommendRedisServiceImpl(RedisApp redisApp) {
        this.redisApp = redisApp;
    }

    @Override
    public Object getRedisApp() {
        return redisApp.getApp("recommend");
    }
}
