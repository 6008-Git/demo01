//controller
//假设
function controllerContent(fileName,allControllerReflect,searchControllerReflect,
                           AllcommentChinese,MethodscommentChinese){
    var controller = 'import com.alibaba.fastjson.JSONObject;\n' +
        'import io.swagger.annotations.Api;\n' +
        'import io.swagger.annotations.ApiOperation;\n' +
        'import org.springframework.beans.factory.annotation.Autowired;\n' +
        'import org.springframework.web.bind.annotation.PostMapping;\n' +
        'import org.springframework.web.bind.annotation.RequestBody;\n' +
        'import org.springframework.web.bind.annotation.RequestMapping;\n' +
        'import org.springframework.web.bind.annotation.RestController;\n' +
        '\n' +
        'import java.util.List;\n' +
        'import java.util.Map;'+'\n\n\n\n\n'+
        '@RestController\n' +
        '@RequestMapping("/'+allControllerReflect+'")\n' +
        '@Api(value = "'+AllcommentChinese+'",tags = "'+AllcommentChinese+'")\n' +
        'public class '+fileName+'Controller'+' {\n' +
        '\n' +
        '    @Autowired\n' +
        '    private '+fileName+'Service'+' '+allControllerReflect+'Service'+';\n' +
        '\n' +
        '    @PostMapping("/'+searchControllerReflect+'")\n' +
        '    @ApiOperation(value = "'+MethodscommentChinese+'",notes = "'+MethodscommentChinese+'")\n' +
        '    public List<Map<String, Object>> '+searchControllerReflect+'(@RequestBody JSONObject param) throws Exception {\n' +
        '        return '+allControllerReflect+'Service'+'.'+searchControllerReflect+'(param);\n' +
        '    }\n' +
        '\n' +
        '}\n'
    return controller
}

//service
function serviceContent(fileName,allControllerReflect,searchControllerReflect,
                        AllcommentChinese,MethodscommentChinese){
    var service = 'import com.alibaba.fastjson.JSONObject;\n' +
        'import com.dareway.serviceDwdsmDeviceAccess.service.base.BaseService;\n'+
        '\n' +
        'import java.util.List;\n' +
        'import java.util.Map;'+'\n\n\n\n\n'+
        'public interface '+fileName+'Service'+' extends BaseService {\n' +
        '    List<Map<String, Object>> '+searchControllerReflect+'(JSONObject param) throws Exception;\n' +
        '\n' +
        '}'
    return service
}
//serviceImpl
function serviceImplContent(fileName,allControllerReflect,searchControllerReflect,
                            AllcommentChinese,MethodscommentChinese) {
    var serviceImpl = 'import com.alibaba.fastjson.JSONObject;\n' +
        'import com.dareway.serviceDwdsmDeviceAccess.service.base.impl.BaseServiceImpl;\n' +
        'import lombok.extern.slf4j.Slf4j;\n' +
        'import org.springframework.beans.factory.annotation.Autowired;\n' +
        'import org.springframework.jdbc.core.JdbcTemplate;\n' +
        'import org.springframework.stereotype.Service;\n' +
        '\n' +
        'import java.util.Date;\n' +
        'import com.dareway.serviceDwdsmDeviceAccess.utils.PubTool;\n' +
        'import com.alibaba.druid.util.StringUtils;\n'+
        'import java.util.List;\n' +
        'import java.util.Map;'+'\n\n\n\n\n\n'+
        '@Service\n' +
        '@Slf4j\n' +
        'public class '+fileName+'ServiceImpl'+' extends BaseServiceImpl implements '+fileName+'Service'+' {\n' +
        '    @Autowired\n' +
        '    private JdbcTemplate jdbcTemplate;\n' +
        '\n' +
        '\n' +
        '    //'+MethodscommentChinese+'\n' +
        '    @Override\n' +
        '    public List<Map<String, Object>> '+searchControllerReflect+'(JSONObject param) throws Exception{\n' +
        '        //获取前端参数'+
        '\n\n'+
        '        //SQL编写\n' +
        '        StringBuffer sb = new StringBuffer();\n'+
        '        List<Object> conditionList= new LinkedList<>();'+
        '\n\n'+
        '        //执行sql，返回list集合    ---queryForList（sql,参数）\n' +
        '        List<Map<String, Object>>  list=  jdbcTemplate.queryForList(sb.toString(),conditionList.toArray());\n' +
        '        return list;\n' +
        '    }\n' +
        '\n' +
        '}\n'
    return serviceImpl
}