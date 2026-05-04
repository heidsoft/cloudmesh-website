// 微信 JS-SDK 分享配置（需要后端支持）
wx.config({
  debug: false,
  appId: '你的公众号AppID',
  timestamp: '时间戳',
  nonceStr: '随机字符串',
  signature: '签名',
  jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
});

wx.ready(function() {
  // 分享给朋友
  wx.updateAppMessageShareData({
    title: 'CloudMesh 解决方案',
    desc: '医疗知识库、排队叫号、弱电工程、3D设计一站式服务',
    link: 'https://cloudmesh.top/solutions/',
    imgUrl: 'https://cloudmesh.top/og-image.png',
    success: function() {}
  });
  
  // 分享到朋友圈
  wx.updateTimelineShareData({
    title: 'CloudMesh 解决方案',
    link: 'https://cloudmesh.top/solutions/',
    imgUrl: 'https://cloudmesh.top/og-image.png',
    success: function() {}
  });
});
