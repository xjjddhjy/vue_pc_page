<template>
  <div class="lyear-layout-web">
    <div class="lyear-layout-container">
      <!--页面主要内容-->
      <main class="lyear-layout-content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-toolbar clearfix">
                  <!-- <form
                    class="pull-right search-bar"
                    method="get"
                    action="#!"
                    role="form"
                  >
                    <div class="input-group">
                      <div class="input-group-btn">
                        <input
                          type="hidden"
                          name="search_field"
                          id="search-field"
                          value="title"
                        />
                        <button
                          class="btn btn-default dropdown-toggle"
                          id="search-btn"
                          data-toggle="dropdown"
                          type="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          标题 <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <a
                              tabindex="-1"
                              href="javascript:void(0)"
                              data-field="title"
                              >标题</a
                            >
                          </li>
                          <li>
                            <a
                              tabindex="-1"
                              href="javascript:void(0)"
                              data-field="cat_name"
                              >栏目</a
                            >
                          </li>
                        </ul>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        value=""
                        name="keyword"
                        placeholder="请输入名称"
                      />
                    </div>
                  </form> -->
                  <div class="toolbar-btn-action">
                    <!-- 跳转到新增页面 -->
                    <router-link to="/adminadd" class="btn btn-primary m-r-5">
                      <i class="mdi mdi-plus"></i> 新增
                    </router-link>

                    <!-- <a class="btn btn-success m-r-5" href="#!"
                      ><i class="mdi mdi-check"></i> 启用</a
                    >
                    <a class="btn btn-warning m-r-5" href="#!"
                      ><i class="mdi mdi-block-helper"></i> 禁用</a
                    >
                    -->
                    <button class="btn btn-danger" @click="deleteAll()">
                      <i class="mdi mdi-window-close"></i> 删除
                    </button>
                    <el-input v-model="input" @input='inputChange' placeholder=搜索用户名></el-input>
                    <!-- <el-button type="danger">批量删除</el-button> -->
                  </div>
                </div>
                <div class="card-body">
                  <!-- 
                    :data 把查询的数据全部放这里
                   -->
                  <el-table
                    ref="multipleTable"
                    :data="adminList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    header-align="center"
                    row-key="id"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <!-- <el-table-column
                      type="index"
                      label="序号"
                      align="cenetr"
                    >
                    </el-table-column> -->

                    <el-table-column type="index" label="序号" align="cenetr">
                      <template slot-scope="scope">
                        <span>{{
                          (listQuery.pageIndex - 1) * listQuery.pageSize +
                          scope.$index +
                          1
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="用户头像" align="center">
                      <template slot-scope="scope">
                        <img :src="scope.row.avatar" alt="" width="60" />
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="username"
                      label="用户名"
                      align="center"
                    >
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                      <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row.id)"
                          >编辑</el-button
                        >
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.row.id)"
                          >删除</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <!-- <pagination
                  :hidden="total < 10 ? true : false"
                  :total="total"
                  :page.sync="listQuery.pageIndex"
                  :limit.sync="listQuery.pageSize"
                  @pagination="adminList"
                /> -->
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[2, 3, 5, 10]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                >
                </el-pagination>
                <!-- <pagination
                  v-show="total > 0"
                  :total="total"
                  :page.sync="listQuery.page"
                  :limit.sync="listQuery.limit"
                  @pagination="getList"
                /> -->
              </div>
            </div>
          </div>
        </div>
      </main>
      <!--End 页面主要内容-->
    </div>
  </div>
</template>

<script>
// import Pagination from "@/components/common/pa";
export default {
  name: "AdminList",
  // 列表数据 详情数据 创建钩子去请求数据
  created() {
    this.adminlist();
  },

  data() {
    return {
      // 后端返回的admin数据全部放在这
      input:'',
      adminList: [],
      sels: [],
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        input:0
      },
      total: 0,
      currentPage:1,
      pageSize:10,
      pageIndex: 1,
    };
  },
  // computed: {
  //   currentPage: {
  //     get() {
  //       return this.page;
  //     },
  //     set(val) {
  //       this.$emit("update:page", val);
  //     },
  //   },
  //   pageSize: {
  //     get() {
  //       return this.limit;
  //     },
  //     set(val) {
  //       this.$emit("update:limit", val);
  //     },
  //   },
  // },
  // components: { Pagination },
  methods: {
    handleSizeChange(val) {
      this.pageSize=val
      console.log(222,val);
      this.listQuery = { pageIndex: this.currentPage, pageSize: val };
      this.adminlist();
      // if (this.autoScroll) {
      //   scrollTo(0, 800)
      // }
    },
    handleCurrentChange(val) {
      this.currentPage=val
      this.pageIndex=val

      console.log(111,val);
      this.listQuery = { pageIndex: val, pageSize: this.pageSize };
      this.adminlist();
      // if (this.autoScroll) {
      //   scrollTo(0, 800)
      // }
    },
    // 定义请求admin的数据
    async adminlist() {
      console.log(33);
      // var data ={
      //   id:1,
      //   username:'admin'
      // }
      /* 
          data = {
            admin:admin
            count: conut
          }      

      */
      var result = await this.$proxy.AdminList({        
        pageIndex:this.pageIndex,
        pageSize:this.pageSize,
        input:this.input});
      //push
      this.adminList = result.data.admin;
      // console.log(result);
      this.total = result.data.count;
    },
    async success(msg) {
      this.$notify({
        title: "成功",
        message: msg,
        type: "success",
      });
    },
    async error(msg) {
      this.$notify.error({
        title: "错误",
        message: msg,
      });
    },
    // 编辑页面
    handleEdit(val) {
      this.$router.push({ path: "/adminedit", query: { id: val } });
    },
    // 删除
    async handleDelete(val) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          var result = await this.$proxy.AdminDel({ id: val });
          if (result.code == 1) {
            this.success(result.msg);
            setTimeout(() => {
              this.adminlist();
            }, 1000);
          } else {
            this.error(result.msg);
          }
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 全选
    handleSelectionChange(val) {
      this.sels = val;
      var that = this;
      // var val = this.selectedData;
      console.log(val);
      if (val) {
        val.forEach(function (item, index) {
          that.tableData.forEach(function (itemI, indexI) {
            if (item === itemI) {
              that.tableData.splice(indexI, 1);
            }
          });
        });
      }
      this.$refs.multipleTable.clearSelection();
    },
    deleteAll() {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          var result = await this.$proxy.AdminDelAll(this.sels);
          if (result.code == 1) {
            this.success(result.msg);
            setTimeout(() => {
              this.adminlist();
            }, 1000);
          } else {
            this.error(result.msg);
          }
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    inputChange(val){
      console.log(val);
      this.input=val;
      this.pageIndex= 1,
      this.adminlist();

    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
