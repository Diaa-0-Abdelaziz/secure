<template>
  <div>
    <video ref="videoPlayer" class="video-js" width="300"
           id="my-video"
           controls
           preload="auto"
           height="264"
           data-setup="{}"
    ></video>
  </div>
</template>

<script>
import videojs from 'video.js';

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      player: null
    }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
      // console.log('onPlayerReady', this);
    })
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  },
  methods:{
    stop(){
      this.player.pause();
    }
  },
}
</script>
