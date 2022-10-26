var allMethods = ''
var startMethod = 'methods:  {'+'\n'
var methodContent = '//表格多选回调\n' +
    '    handleSelectionChange(){\n' +
    '\n' +
    '    },\n' +
    '    //明细页面--查询展示更多\n' +
    '    showMore() {\n' +
    '      if (this.showFormMore == false){\n' +
    '        this.showFormMore = true\n' +
    '        return\n' +
    '      }\n' +
    '      this.showFormMore = false\n' +
    '    },\n' +
    '    //获取日期\n' +
    '    getDay(day){\n' +
    '      let today = new Date();\n' +
    '      let targetDay_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;\n' +
    '      today.setTime(targetDay_milliseconds);\n' +
    '      let tYear = today.getFullYear();\n' +
    '      let tMonth = today.getMonth();\n' +
    '      let tDate = today.getDate();\n' +
    '      tMonth = this.doHandleMonth(tMonth + 1);\n' +
    '      tDate = this.doHandleMonth(tDate);\n' +
    '      return tYear + "-" + tMonth + "-" + tDate;\n' +
    '    },\n' +
    '    doHandleMonth(month){\n' +
    '      let m = month;\n' +
    '      if (month.toString().length == 1) {\n' +
    '        m = "0" + month;\n' +
    '      }\n' +
    '      return m;\n' +
    '    },\n' +
    '    //日期判断\n' +
    '    judgeDateTab(val) {\n' +
    '      let tmp = val\n' +
    '      let dateTmp = this.getDay(0)\n' +
    '      if (tmp > dateTmp){\n' +
    '        this.$message({\n' +
    '          showClose: true,\n' +
    '          message: \'所选日期不能大于当前日期\',\n' +
    '          type: \'error\'\n' +
    '        });\n' +
    '        this.formCollAbnormalDetailModel.dataDate = dateTmp\n' +
    '      }\n' +
    '    },\n' +
    '    //切换每页展示条数时回调\n' +
    '    handleSizeChangeTab(val) {\n' +
    '      this.pageSizeTab1=val\n' +
    '      this.$showTable("allTableDataTab","tableData","currentPageTab","pageSizeTab")\n' +
    '    },\n' +
    '    //切换页码时触发的回调\n' +
    '    handleCurrentChangeTab(val) {\n' +
    '      this.currentPageTab1=val\n' +
    '      this.$showTable("allTableDataTab","tableData","currentPageTab","pageSizeTab")\n' +
    '    },\n' +
    '    //查询子单位数据\n' +
    '    queryDetail(row){\n' +
    '      this.formXXXModel.orgNo = row.orgNo;\n' +
    '      this.queryXXX(\'formXXXRef\');\n' +
    '    },\n' +
    '    //YYY编号模糊查询\n' +
    '    queryYYYId(query) {\n' +
    '      if (query !== \'\'&&query.length>=3) {\n' +
    '        this.loading = true;\n' +
    '        setTimeout(() => {\n' +
    '          this.$post(this.globalAPI.queryYYYId.url, {terminalId:query})\n' +
    '              .then((res) =>{\n' +
    '                this.dataList=res\n' +
    '                this.loading = false;\n' +
    '                this.optionsYYYId = this.dataList.map(item => {\n' +
    '                  return { value: `${item.terminalId}`, label: `${item.terminalId}`+\'-\'+`${item.terminalName}`};\n' +
    '                });\n' +
    '              })\n' +
    '              .catch((error) =>{\n' +
    '                this.$alert("数据有误"+error);       //请求失败返回的数据\n' +
    '              });\n' +
    '        }, 200);\n' +
    '      } else {\n' +
    '        this.optionsYYYId = [];\n' +
    '      }\n' +
    '    },\n' +
    '    //选择YYY编号时替换对应的其他表单的名称\n' +
    '    replaceOtherName(value){\n' +
    '      this.dataList.map(item =>{\n' +
    '        if(item.terminalId==value) {\n' +
    '          this.formXXXModel.terminalName = item.terminalName\n' +
    '        }\n' +
    '      })\n' +
    '    },\n' +
    '    //查询\n' +
    '    queryXXX(formName){\n' +
    '      this.$refs[formName].validate((valid) => {\n' +
    '        if (valid) {\n' +
    '          this.$post(this.globalAPI.queryXXX.url, this.formXXXModel)\n' +
    '              .then((res) =>{\n' +
    '                this.allTableDataTab=res\n' +
    '                this.$showTable("allTableDataTab","tableData","currentPageTab","pageSizeTab")\n' +
    '              })\n' +
    '              .catch((error) =>{\n' +
    '                this.$alert("数据有误"+error);       //请求失败返回的数据\n' +
    '              });\n' +
    '        } else {\n' +
    '          console.log(\'查询错误!!\');\n' +
    '          return false;\n' +
    '        }\n' +
    '      });\n' +
    '    },\n' +
    '    //重置\n' +
    '    resetXXXForm(formName) {\n' +
    '      this.$refs[formName].resetFields();\n' +
    '    },'
var endMethod = '\n'+'}'

allMethods = startMethod + methodContent +endMethod
console.log(allMethods)