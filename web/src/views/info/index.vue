<template>
  <div class="info">
    <div class="info-inner">
      <div class="address">
        {{ shopAddress }}
        <a :href="`tel:${shopPhone}`"></a>
      </div>
      <div class="info-item">
        {{ poiQualificationInfo.content }}
        <span></span>
      </div>
      <div class="service">
        <span>配送服务: &nbsp;</span>
        <img src="../../assets/icon.png" alt />
        <span>提供高品质配送服务</span>
      </div>
      <div class="time">
        <span>配送时间&nbsp;: &nbsp;09.25-23.00</span>
      </div>
      <div class="tip">
        {{ tip }}
        <span></span>
      </div>

      <div class="shopEnvTitle">
        商家服务
        <span>该商户为品牌商户</span>
        <span>改商户支持在线支付</span>
      </div>

      <!--  -->
      <info-list :activityList="activityList" />
    </div>
  </div>
</template>

<script>
import InfoList from './components/InfoList';
export default {
  name: 'Info',
  components: { InfoList },
  data() {
    return {
      shopAddress: '',
      activityList: [
        {
          actDesc: '满30减12, 满65减23, 满99减30, (在线支付专享)',
          bgc:
            'http://p0.meituan.net/activityconfig/6087b33fd42d14fd94e899084aaef56d1720.png'
        },
        {
          actDesc: '折扣商品2.15折起 (在线支付专享)',
          bgc:
            'http://p0.meituan.net/activityconfig/3da2d9c7a4ddf89e4e71cfdfff168c391088.png'
        },
        {
          actDesc: '该商家支持在线支付',
          bgc:
            'http://p1.meituan.net/xianfu/32200c3060be7903f62c9076308619ee734.png'
        }
      ],
      poiQualificationInfo: '',
      tip: '',
      shopPhone: []
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      const { data, status } = await this.$axios('//localhost:3001/getInfo');
      if (status === 200) {
        const {
          shopAddress,
          poiQualificationInfo,
          tip,
          shopPhone
        } = data.data.data;

        this.shopAddress = shopAddress;
        this.poiQualificationInfo = poiQualificationInfo;
        this.tip = tip;
        this.shopPhone = shopPhone;
      }
    }
  }
};
</script>
<style scoped lang="less">
@import './index.less';
</style>
