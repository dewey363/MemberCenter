<template>
    <div class="gd-wrap">
      <div class="no-data" v-if="pageData.noData">暂无商品详情</div>
      <div class="gd-container" v-else>
        <v-swiper ref="swiper">
          <div class="slide-item" v-for="pic in pageData.goodsDetail.goodspic">
            <div class="slide-pic" :style="`background: url(${pic}) no-repeat center; background-size: 100% 100%;`"></div>
          </div>
        </v-swiper>
        <div class="gd-scroll">
          <v-scroll ref="scrollview" :loadMore="false" :bounce="false">
            <div slot="defaultScroll">
              <div class="gd-info">
                <h2>{{pageData.goodsDetail.title}}<span v-if="pageData.goodsDetail.isselfdeliver">需自提</span></h2>
                <div class="gd-price">
                  <b>{{pageData.goodsDetail.score}}</b>积分 +
                  <span>¥ {{pageData.goodsDetail.money}}</span>
                  <div class="gd-original">市场参考价：<span>{{pageData.goodsDetail.orig}}</span>元</div>
                </div>
              </div>
              <div class="gd-desc">
                <div class="echelon-box">商品描述</div>
                <div id="watchImages" class="gd-richtext" v-html="pageData.goodsDetail.detail"></div>
              </div>
            </div>
          </v-scroll>
        </div>
        <div class="pay-bar">
          <div class="paybar-wrap">
            <div class="pay-info">
              <i class="payscore-icon"></i>
              <span>所需金额：{{pageData.goodsDetail.score}}积分</span>
            </div>
            <div class="echelon-box" @click="createOrder">立即兑换</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import {getGoodsDetail} from 'mock/getMocks';
  import Swiper from 'components/scroll/swiper';
  import Scroll from 'components/scroll/scrollView';
  import ImagesLoaded from 'imagesloaded';
    export default {
      name: 'goods-detail',
      data () {
        return {
          pageData: {
            goodsId: '',
            goodsDetail: {},
            noData: !1
          }
        };
      },
      mounted () {
        this.init();
      },
      methods: {
        init () {
          this.pageData.goodsId = this.$route.query.id;
          this.getGoodsDetail();
        },
        async getGoodsDetail () {
          try {
            let goodsDetailResp = await getGoodsDetail({
              id: this.pageData.goodsId
            });
            if (goodsDetailResp.statusText === 'OK' && goodsDetailResp.data.data.length) {
              this.pageData.goodsDetail = JSON.parse(goodsDetailResp.data.data);
              this.pageData.goodsDetail.goodspic = this.pageData.goodsDetail.scrollimgs.split(',');
              this.pageData.noData = !1;
              this.$refs.swiper.update();
              this.$nextTick(() => {
                ImagesLoaded(document.querySelector('#watchImages'), () => {
                  this.$refs.scrollview.refresh();
                });
              });
            } else {
              this.pageData.noData = !0;
            }
          } catch (e) {
            this.pageData.noData = !0;
          }
        },
        createOrder () {
          this.$router.push({
            path: 'generateorder',
            query: {id: this.pageData.goodsId}
          });
        }
      },
      components: {
        'v-scroll': Scroll,
        'v-swiper': Swiper
      }
    };
</script>
<style rel="stylesheet/stylus" lang="stylus">
  @import '../../../assets/stylus/mixin.styl';
  .gd-wrap
    padding px2rem(24)
    .slide-item
      width px2rem(702)
      height px2rem(430)
      border-radius px2rem(10)
      overflow hidden
      .slide-pic
        width 100%
        height 100%
    .gd-scroll
      position absolute
      top px2rem(478)
      left 0
      right 0
      width 100%
      bottom px2rem(70)
      .scrollwrap
        padding 0 px2rem(24)
        .gd-info
          width 100%
          padding px2rem(36) px2rem(24)
          background-color #fff
          border-radius px2rem(10)
          font-size px2rem(24)
          & h2
            font-size px2rem(30)
            font-weight bold
            line-height px2rem(34)
            & span
              margin-left px2rem(36)
              font-size px2rem(20)
              padding px2rem(4) px2rem(20)
              border px2rem(1) solid #ff0000
              color #ff0000
              border-radius px2rem(8)
          .gd-price
            margin-top px2rem(40)
            position relative
            & b
              font-size px2rem(36)
              font-weight bold
              color #ff9d16
              margin-right px2rem(10)
            .gd-original
              position absolute
              right 0
              top px2rem(8)
              & span
                text-decoration line-through
        .gd-desc
          margin-top px2rem(20)
          .gd-richtext
            width 100%
            min-height px2rem(300)
            padding px2rem(20)
            background-color #fff
            border-top-right-radius px2rem(10)
            border-bottom-left-radius px2rem(10)
            border-bottom-right-radius px2rem(10)
            & img
              width 100%
              display block
              margin-top px2rem(10)
            & p
              padding px2rem(10) 0
              text-align justify
              font-size px2rem(24)
</style>
