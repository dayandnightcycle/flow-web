<template>
    <div style="width:100%;height:100%;display: flex;flex-direction: column;">
        <div class="tasks" style="flex:1;display: flex;flex-direction: column;">
            <div style="font-size:18px;font-weight:600;padding-left:20px;margin-top:15px;">已完成任务</div>
            <div style="flex:1">
                <el-table class="tablecss" :data="handleList">
                    <el-table-column prop="xh" label="序号" />
                    <el-table-column prop="name" label="名称" />
                    <el-table-column prop="description" label="受理编号" />
                    <el-table-column prop="createTime" label="发起时间" />
                </el-table>
                <el-pagination v-model:page-size="page.size" :page-sizes="[10, 20, 30, 40]"
                    layout="total, sizes, prev, pager, next, jumper" :total="Number(page.total || 0)"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
        </div>
</div>
</template>

<script setup>
import { useStore } from "vuex";
import { getCurrentInstance, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import router from "../../router";
import Cookies from "js-cookie";
const store = useStore();
const { proxy } = getCurrentInstance();

const claimList = reactive([]);
const handleList = reactive([]);

const userId = Cookies.get("userId");
const page = reactive({
    total: "", //总数据量
    size: 20, //每页显示的数据量   默认为10
    number: "",
});
const handleCurrentChange = (val) => {
    page.number = val;
    handleList.length = 0;
    let pageNumber = val;
    let pageSize = page.size;
    //待处理
    proxy.$http
        .get(
            "/flow/lssj?processDefinitionKey=GYJSYDSYQJFWSYQDYDJ" +
            "&pageNumber=" +
            pageNumber +
            "&pageSize=" +
            pageSize
        )
        .then((res) => {
            console.log('ywcyw', res);
            const code = res.data.code;
            if (code === 0) {
                const tasks = res.data.data;
                page.total = tasks[tasks.length - 1].count;
                for (let i = 0; i < tasks.length - 1; i++) {
                    let aaa = tasks[i];
                    aaa.xh = (page.number - 1) * page.size + i + 1;
                    handleList.push(tasks[i]);
                }
            }
        })
        .catch(function (err) {
        });
};
const handleSizeChange = (val) => {
    page.size = val;
    handleCurrentChange(1);
};

onMounted(() => {
    handleCurrentChange(1);
});
</script>

<style scoped>
.logout {
    position: absolute;
    right: 5px;
    top: 5px;
}

.tablecss {
    width: 95%;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 15px;
    /* box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 0.3); */
}

.cell {
    font-size: 16px;
    font-weight: 600;
}

.el-table__header-wrapper :deep(.ceil) {
    font-size: 16px !important;
    font-weight: 600 !important;
}
</style>
