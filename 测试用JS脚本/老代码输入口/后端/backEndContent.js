//controller
//假设
var inputNameChinese = ''
var inputNameEnglish = ''
function controllerContent(fileName,allControllerReflect,searchControllerReflect,
                           AllcommentChinese,MethodscommentChinese){
    var controller = '@RestController\n' +
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
    var service = 'public interface '+fileName+'Service'+' extends BaseService {\n' +
        '    List<Map<String, Object>> '+searchControllerReflect+'(JSONObject param) throws Exception;\n' +
        '\n' +
        '}'
    return service
}
//serviceImpl
function serviceImplContent(fileName,allControllerReflect,searchControllerReflect,
                            AllcommentChinese,MethodscommentChinese) {
    var serviceImpl = '@Service\n' +
        '@Slf4j\n' +
        'public class '+fileName+'ServiceImpl'+' extends BaseServiceImpl implements '+fileName+'Service'+' {\n' +
        '    @Autowired\n' +
        '    private JdbcTemplate jdbcTemplate;\n' +
        '\n' +
        '\n' +
        '    //'+MethodscommentChinese+'\n' +
        '    @Override\n' +
        '    public List<Map<String, Object>> '+searchControllerReflect+'(JSONObject param) throws Exception{\n' +
        '        return null;\n' +
        '    }\n' +
        '\n' +
        '}\n'
    return serviceImpl
}