var serverUrl = "http://localhost:8080/api/monitor/server";

// cpu
var cpuChart = echarts.init(document.getElementById('cpuMain'));
var xDataCpu = ['0'];
var cpuNum = [0];
var cpuUsed = [0];
var cpuSys = [0];
var cpuFree = [0];
var optionCpu = {
    title: {
        text: 'CPU'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['核心数(个)', '用户使用率(%)', '系统使用率(%)', '当前空闲率(%)']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    color: ['#8378ea', '#6fbae1', '#fbe289', '#e58dc2'],
    xAxis: [
        {
            type: 'category',
            name: '时间',
            nameLocation: 'center',
            nameGap: '22',
            boundaryGap: false,
            data: xDataCpu
        }
    ],
    yAxis: [
        {
            type: 'value',
            show: true
        }
    ],
    series: [
        {
            name: '核心数(个)',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: cpuNum,
        },
        {
            name: '用户使用率(%)',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: cpuUsed
        },
        {
            name: '系统使用率(%)',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: cpuSys
        },
        {
            name: '当前空闲率(%)',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: cpuFree
        }
    ]
};

// 内存
var memChart = echarts.init(document.getElementById('memMain'));
var xDataMem = ['0'];
var memTotal = [0];
var memUsed = [0];
var memFree = [0];
var memUsage = [0];
var optionMem = {
    title: {
        text: '内存'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['剩余内存(GB)', '已用内存(GB)', '总内存(GB)', '使用率(%)']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            name: '时间',
            nameLocation: 'center',
            nameGap: '22',
            boundaryGap: false,
            data: xDataMem
        }
    ],
    yAxis: [
        {
            type: 'value',
            show: true
        }
    ],
    series: [
        {
            name: '剩余内存(GB)',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: memFree
        },
        {
            name: '已用内存(GB)',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: memUsed
        },
        {
            name: '总内存(GB)',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: memTotal
        },
        {
            name: '使用率(%)',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: memUsage
        }
    ]
};

// java程序内存
var jvmChart = echarts.init(document.getElementById('jvmMain'));
var xDataJvm = ['0'];
var jvmTotal = [0];
var jvmUsed = [0];
var jvmFree = [0];
var jvmUsage = [0];
var optionJvm = {
    title: {
        text: 'java内存'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['剩余内存(GB)', '已用内存(GB)', '总内存(GB)', '使用率(%)']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    color: ['#91ca8c', '#7289ab', '#f49f42', '#73b9bc'],
    xAxis: [
        {
            type: 'category',
            name: '时间',
            nameLocation: 'center',
            nameGap: '22',
            boundaryGap: false,
            data: xDataJvm
        }
    ],
    yAxis: [
        {
            type: 'value',
            show: true
        }
    ],
    series: [
        {
            name: '剩余内存(GB)',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: jvmFree
        },
        {
            name: '已用内存(GB)',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: jvmUsed
        },
        {
            name: '总内存(GB)',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: jvmTotal
        },
        {
            name: '使用率(%)',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: jvmUsage
        }
    ]
};

function startInterval() {
    let interval = setInterval(function () {
        if (document.getElementById('serverMonitor') === null) {
            clearInterval(interval);
            return;
        }
        getServer();
    }, 5000);
}

function push(list, data) {
    if (data == null) {
        return false;
    }
    if (list.length === 7) {
        list.reverse();
        list.pop();
        list.reverse();
    }
    list.push(data);
    return true;
}

function dateFormat(date, format) {
    let ret;
    const opt = {
        "y+": date.getFullYear().toString(),        // 年
        "M+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "m+": date.getMinutes().toString(),         // 分
        "s+": date.getSeconds().toString()          // 秒
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(format);
        if (ret) {
            format = format.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return format;
}

function getServer() {
    $.ajax({
        url: serverUrl,
        async: true,
        type: 'GET',
        dataType: 'json',
        data: null,
        success: function (res) {
            if (res.status === 'success') {
                let data = res.data;
                // cpu
                push(xDataCpu, dateFormat(new Date, "HH:mm:ss"));
                push(cpuNum, data.cpu.cpuNum);
                push(cpuUsed, data.cpu.used);
                push(cpuSys, data.cpu.sys);
                push(cpuFree, data.cpu.free);
                cpuChart.setOption(optionCpu);
                // 内存
                push(xDataMem, dateFormat(new Date, "HH:mm:ss"));
                push(memTotal, data.mem.total);
                push(memUsed, data.mem.used);
                push(memFree, data.mem.free);
                push(memUsage, data.mem.usage);
                memChart.setOption(optionMem);
                // java程序
                push(xDataJvm, dateFormat(new Date, "HH:mm:ss"));
                push(jvmTotal, data.jvm.total);
                push(jvmUsed, data.jvm.used);
                push(jvmFree, data.jvm.free);
                push(jvmUsage, data.jvm.usage);
                jvmChart.setOption(optionJvm);
                $('#name').text(data.jvm.name);
                $('#version').text(data.jvm.version);
                $('#startTime').text(data.jvm.startTime);
                $('#runTime').text(data.jvm.runTime);
                $('#home').text(data.jvm.home);
                $('#max').text(data.jvm.max + 'MB');
                $('#userDir').text(data.sys.userDir);
                $('#computerName').text(data.sys.computerName);
                $('#osName').text(data.sys.osName);
                $('#computerIp').text(data.sys.computerIp);
                $('#osArch').text(data.sys.osArch);
                // 磁盘信息
                let $disk = $('#disk');
                $disk.empty();
                let sysFiles = data.sysFiles;
                let content = '';
                for (let file of sysFiles) {
                    content += '<tr>\n' +
                        '              <td>' + file.dirName + '</td>\n' +
                        '              <td>' + file.sysTypeName + '</td>\n' +
                        '              <td>' + file.typeName + '</td>\n' +
                        '              <td>' + file.total + '</td>\n' +
                        '              <td>' + file.free + '</td>\n' +
                        '              <td>' + file.used + '</td>\n';
                    if (file.usage <= 70) {
                        content += '<td><span class="label label-success">' + file.usage + '%</span></td>\n' +
                            '        </tr>';
                    } else if (file.usage <= 85) {
                        content += '<td><span class="label label-warning">' + file.usage + '%</span></td>\n' +
                            '        </tr>';
                    } else {
                        content += '<td><span class="label label-danger">' + file.usage + '%</span></td>\n' +
                            '        </tr>';
                    }
                }
                $disk.append(content);
            }
        },
        error: function (xhr, errorType, error) {
            alert(JSON.parse(xhr.responseText).ExceptionMessage)
        }
    });
}

getServer();
startInterval();