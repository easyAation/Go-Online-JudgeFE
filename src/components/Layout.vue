<template lang="html">
    <div class="nav-wrap">
        <Layout>
            <Header :style="{position: 'fixed', width: '100%', 'z-index': 100}">
            <Menu mode="horizontal" active-name="active">
                <div class="left">
                <MenuItem name="home" :to="{name: 'Home'}">
                    <Icon type="ios-home"/>
                        主页
                </MenuItem>
               
                <MenuItem name="problem" :to="{name: 'problemList'}">
                    <Icon type="ios-apps" />
                        题目
                </MenuItem>
                
                <MenuItem name="discuss">
                    <Icon type="ios-chatboxes" />
                        讨论
                </MenuItem>

                
                <MenuItem name="status" :to="{name: 'status'}">
                    <Icon type="md-refresh" />
                        状态
                </MenuItem>
               
                <MenuItem name="rank" :to="{name: 'rankList'}">
                    <Icon type="ios-stats" />
                        排名
                </MenuItem>
                
                <router-link to="/contests">
                <MenuItem name="contest" :to="{name: 'contestList'}">
                    <Icon type="md-trophy" />
                        比赛
                </MenuItem>
                </router-link>
                <router-link to="/faq">
                <MenuItem name="faq" :to="{name: 'faq'}">
                    <Icon type="ios-help-circle" />
                        FAQ
                </MenuItem>
                </router-link>

                <Submenu v-if="isLogined" name="admin">
                    <template slot="title">
                        <Icon type="paper-airplane"></Icon>Admin
                    </template>
                    <MenuItem name="problemCreate" :to="{name: 'problemCreate'}">创建题目</MenuItem>
                    <MenuItem name="contestCreate" :to="{name: 'contestCreate'}">创建比赛</MenuItem>
                    <MenuItem name="newsCreate">创建新闻</MenuItem>
                    <MenuItem name="userEdit">用户管理</MenuItem>
                </Submenu>
                </div>
            </Menu>
            <div class="right">
                <Dropdown v-if="isLogined" @on-click="profileAction">
                    <a href="javascript:void(0)" style="font-size:15px">
                        {{ session.name }}
                        <Icon type="ios-arrow-down" />
                    </a>
                    <DropdownMenu slot="list">
                        <!-- <DropdownItem v-if="profile.username === 'admin'" name="admin">Admin</DropdownItem> -->
                        <DropdownItem name="profile">Profile</DropdownItem>
                        <DropdownItem name="logout">Logout</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                
                <Button type="text" @click="toDisplayModal = true" v-else>Login / Register</Button>
                 <Modal v-model="toDisplayModal">
                    <Tabs v-model="behavior">
                        <TabPane label="Login" name="login">
                            <Form ref="loginForm" :model="form" :label-width="100">
                                <FormItem class="loginuid" label="UserID" prop="uid">
                                    <Input v-model="form.uid"></Input>
                                </FormItem>
                                <FormItem class="loginpwd" label="Password" prop="pwd">
                                    <Input v-model="form.pwd" type="password"></Input>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane label="Register" name="register">
                            <Form ref="registerForm" :model="form" :label-width="100">
                                <FormItem label="*帐号" prop="uid">
                                    <Input v-model="form.uid" ></Input>
                                </FormItem>
                                <FormItem label="*昵称" prop="name">
                                    <Input v-model="form.name"></Input>
                                </FormItem>
                                <FormItem label="*密码" prop="pwd">
                                    <Input type="password" v-model="form.pwd" value="必填"></Input>
                                </FormItem>
                                <FormItem label="*重复密码" prop="rpwd" class="rpwd">
                                    <Input type="password" v-model="form.rpwd"></Input>
                                </FormItem>
                                <FormItem label="博客" prop="blog">
                                    <Input v-model="form.blog"> </Input>
                                </FormItem>
                                <FormItem label="githup" prop="githup">
                                    <Input v-model="form.githup"> </Input>
                                </FormItem>
                            </Form>
                        </TabPane>
                    </Tabs>
                    <div slot="footer">
                        <Row type="flex" justify="center">
                            <Col :span="20">
                            <Button type="primary" size="large" long @click="submit(behavior)">Submit</Button>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            </div>
            </header>
            <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px', padding: '20px 40px'}">
                <router-view></router-view>
            </Content>
            <Footer class="layout-footer-center">
                <strong>Online-Judge</strong> <a href="http://opensource.org/licenses/mit-license.php" target="_blank">MIT</a>.
            </Footer>
        </Layout>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      toDisplayModal: false,
      behavior: "login",
      form: {
        uid: "",
        pwd: "",
        rpwd: "",
        name: "",
        blog: "",
        githup: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      isLogined: "session/isLogined",
      session: "session/sessionInfo"
    })
  },
  methods: {
    profileAction(name) {
      if (name == "logout") {
        this.$store.dispatch("session/logout");
        this.$Message.info("bye bye!");
      } else if (name == "profile") {
        this.$router.push({
          name: "userInfo",
          params: { uid: this.accountInfo.uid }
        });
      }
    },
    submit(behavior) {
      console.log(behavior);
      if (behavior == "login") {
        this.$store
          .dispatch("session/signin", {
            id: this.form.uid,
            password: this.form.pwd
          })
          .then(res => {
            this.$Message.success("登录成功!");
            this.$store.dispatch(
              "userInfo/getUserSolves",
              localStorage.getItem("token")
            );
          })
          .catch(err => {
            //   this.$Message.error("帐号或者密码错误!");
            console.log(err.message);
          });
      } else if (behavior == "register") {
        this.$store
          .dispatch("session/register", {
            id: this.form.uid,
            name: this.form.name,
            password: this.form.pwd,
            githup_addr: this.form.githup,
            blog_addr: this.form.blog
          })
          .then(res => {
            this.$Message.success("欢迎!");
          });
      }
    }
  },
  created() {
    this.$store.dispatch("session/init");
  }
};
</script>

<style lang="stylus">
.nav-wrap {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  .ivu-layout-header {
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 2px 0px 0px 0px;
    height: 62px;
    line-height: 62px;
    box-shadow: 0 2px 3px hsla(0, 0%, 4%, 0.1);
  }

  .ivu-menu-horizontal {
    height: 62px;
    line-height: 60px;
  }

  .left {
    width: 900px;
    margin: 0 auto;
    margin-left: 5%;
  }

  .right {
    margin-right: 5%;

    .ivu-btn {
      font-size: 14px;
      margin-bottom: 6px;
    }
  }

  .layout-footer-center {
    text-align: center;

    p {
      margin-bottom: 8px;
    }
  }
}

.ivu-tabs-nav-container {
  font-size: 16px;
}

.ivu-tabs-nav {
  .ivu-tabs-tab {
    padding: 8px 16px 12px 16px;
  }
}

.ivu-form-item {
  margin-right: 20px;
}

.checkpwd {
  margin-bottom: 5px;
}

.loginuid {
  margin-top: 56px;
  margin-bottom: 30px;
}
</style>