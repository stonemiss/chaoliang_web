<template>
    <div class="edu">
        <div class="edu_top wow animate__animated animate__fadeIn" :style="{'backgroundImage': 'url('+ backgroundFileUrl+')'}" @click="goOtherPath(bannerDetail)">
            <img v-if="bannerDetail.image" :src="url + bannerDetail.image.fileUrl" alt="" @load="bannerImgLoading">
        </div>
        <div class="edu_content">
            <div class="edu_section">
                <div class="edu_section_box">
                    <el-form :model="ruleForm" :rules="rules" label-width="150px" label-position="right" ref="ruleForm">
                        <el-form-item label="预约活动：" prop="restaurantId">
                            <!-- <el-select style="width: 100%;" v-model="ruleForm.restaurantId" placeholder="请选择预约活动">
                                <el-option v-for="item in eduData" :key="item.id" :label="item.title" :value="item.id"></el-option>
                            </el-select> -->
                            <el-cascader
                                style="width: 100%;"
                                v-model="ruleForm.restaurantId"
                                placeholder="请选择预约活动"
                                filterable
                                :options="eduData"
                                :props="{
                                    value: 'value',
                                    label: 'name',
                                    expandTrigger: 'hover',
                                    emitPath: false,
                                    checkStrictly: true,
                                }"
                                clearable
                            ></el-cascader>
                        </el-form-item>
                        <el-form-item label="联系人：" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入联系人姓名" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式：" prop="contact">
                            <el-input v-model="ruleForm.contact" placeholder="请输入联系人联系方式" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="预约活动时间：" prop="partTime">
                            <el-date-picker
                                clearable
                                style="width: 100%;"
                                v-model="ruleForm.partTime"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="请选择预约活动时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="单位：" prop="department">
                            <el-input v-model="ruleForm.department" placeholder="请输入预约活动单位" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="人数：" prop="count">
                            <el-input v-model="ruleForm.count" placeholder="请输入预约活动人数" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="备注：" prop="remark">
                            <el-input type="textarea" :rows="4" v-model="ruleForm.remark" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="button_group">
                        <el-button size="medium" type="primary" :disabled="isSubmit" @click="submitForm('ruleForm')">提交报名</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { restaurantPage,mealSet,scenicPage,restaurantActivityList } from "../../api/management.js";
export default {
    data() {
        var valiNumberPass = (rule, value, callback) => {
            // //包含小数的数字
            // let reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
            // 正整数
            let reg = /^[1-9]\d*$/g;
            if (value === '') {
                callback(new Error('请输入数字'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入正确的数字（正整数）'));
            } else {
                callback();
            }
        };
        var valiMobilePass = (rule, value, callback) => {
            // 手机号码验证
            let reg = /^1[3-9]\d{9}$/;
            if (value === '') {
                callback(new Error('请输入手机号码'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号码'));
            } else {
                callback();
            }
        };
        return {
            url:process.env.VUE_APP_WEB_URL,
            bannerDetail:{},
            imageLoading:false,
            backgroundFileUrl:'',
            ruleForm:{
                restaurantId:this.$route.query.id ? JSON.parse(this.$route.query.id) : '',
                name:'',
                contact:'',
                partTime:'',
                department:'',
                count:'',
                remark:'',
            },
            rules:{
                restaurantId: [
                    { required: true, message: '请选择预约活动', trigger: 'change' },
                ],
                name: [
                    { required: true, message: '请输入联系人姓名', trigger: 'blur' },
                ],
                contact: [
                    { required: true, message: '请输入联系人联系方式', trigger: 'blur' },
                    { validator: valiMobilePass, trigger: 'blur' },
                ],
                partTime: [
                    { required: true, message: '请选择预约活动时间', trigger: 'change' },
                ],
                department: [
                    { required: true, message: '请输入预约活动单位', trigger: 'blur' },
                ],
                count: [
                    { required: true, message: '请输入预约活动人数', trigger: 'blur' },
                    { validator: valiNumberPass, trigger: 'blur' },
                ],
            },
            isSubmit: false,
            eduData:[]
        }
    },
    methods:{
        bannerImgLoading(ev) {
            this.imageLoading = true
            this.backgroundFileUrl = this.url + this.bannerDetail.image.fileUrl;
        },
        // banner图
        async getScenicPage() {
            const res = await scenicPage (
                {
                    current:1,
                    pageSize:-1,
                    type:2,
                }
            )
            if(res.code==1) {
                if(res.data.records.length>0) {
                    res.data.records.forEach((item) => {
                        if(item.bannerName=='我要预约') {
                            this.bannerDetail = item;
                            this.backgroundFileUrl = this.url + item.image.thinUrl;
                        }
                    })
                }
            }
        },
        goOtherPath(item) {
            if(item.linkUrl) {
                window.open(item.linkUrl)
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    this.isSubmit = true;
                    const res = await mealSet(this.ruleForm);
                    if(res.code==1) {
                        this.$message.success('提交成功');
                        this.resetForm(formName);
                        this.isSubmit = false;
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.ruleForm = {
                restaurantId:this.$route.query.id ? JSON.parse(this.$route.query.id) : '',
                name:'',
                contact:'',
                partTime:'',
                department:'',
                count:'',
                remark:'',
            }
            this.$refs[formName].resetFields();
        },
        async getRestaurantActivityList() {
            const res = await restaurantActivityList()
            if(res.code==1) {
                let list = res.data
                // 给一级添加disabled为true
                list.forEach(item => {
                    item.disabled = true
                })
                this.eduData = list
            }
        }
    },
    created() {
        this.getScenicPage()
        this.getRestaurantActivityList();
    },
    mounted() {
        new this.$wow.WOW().init();
    }
}
</script>
<style lang="scss" scoped>
.edu {
    width: 100%;
    height: 100%;
    .edu_top {
        height: 575px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        img {
            width: 0;
            height: 0;
            object-fit: cover;
        }
    }
    .edu_content{
        padding: 60px 0 80px 0;
        .edu_section {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            .edu_section_box{
                width: 800px;
                :deep .el-form {
                    .el-form-item {
                        margin-bottom: 30px;
                        .el-form-item__label{
                            font-size: 17px;
                            color: #111111;
                            height: 48px!important;
                            line-height: 43px!important;
                        }
                        .el-form-item__label:before {
                            color: #e72e2e;
                            font-size: 20px;
                        }
                        .el-form-item__content {
                            .el-input {
                                display: flex;
                                justify-content: center;
                                .el-input__inner {
                                    font-size: 16px;
                                    height: 48px!important;
                                    line-height: 48px!important;
                                }
                                input::-webkit-input-placeholder{
                                    -webkit-text-fill-color: #989ca6;
                                }
                            }

                        }
                    }
                }
                .button_group {
                    display: flex;
                    justify-content: center;
                    margin-top: 50px;
                    .el-button {
                        background-color: #0050f4;
                        border-color: #0050f4;
                        width: 200px;
                        height: 45px;
                        font-size: 18px;
                    }
                }
            }
        }
    }
}

</style>