<template>
  <div id="app" class="h-100" :class="[skinClasses]">
    <!-- <component :is="layout"> -->
    <component :is="layout">
      <router-view />
    </component>

    <!-- </component> -->
  </div>
</template>

<script>
import store from "@/store";
import { useWindowSize, useCssVar } from "@vueuse/core";
import LayoutVertical from "@/layouts/vertical/LayoutVertical.vue";
import LayoutFull from "@/layouts/full/LayoutFull.vue";
// const LayoutFull = () => import("@/layouts/full/LayoutFull.vue");
import { watch } from "@vue/composition-api";
// This will be populated in `beforeCreate` hook
import { $themeConfig, $themeColors, $themeBreakpoints } from "@themeConfig";
import useAppConfig from "@core/app-config/useAppConfig";
export default {
  name: "App",
  // eslint-disable-next-line vue/no-unused-components
  components: { LayoutFull, LayoutVertical },
  computed: {
    layout() {
      if (this.$route.meta.layout === "full") return "layout-full";
      return `layout-${this.contentLayoutType}`;
    },
    contentLayoutType() {
      return this.$store.state.appConfig.layout.type;
    },
  },
  beforeCreate() {
    // Set colors in theme
    const colors = [
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "danger",
      "light",
      "dark",
    ];

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(
        `--${colors[i]}`,
        document.documentElement
      ).value.trim();
    }
    console.log($themeColors);
    // Set Theme Breakpoints
    const breakpoints = ["xs", "sm", "md", "lg", "xl"];

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(
        useCssVar(
          `--breakpoint-${breakpoints[i]}`,
          document.documentElement
        ).value.slice(0, -2)
      );
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout;
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  },

  setup() {
    const { skin, skinClasses } = useAppConfig();

    // Set Window Width in store
    store.commit("app/UPDATE_WINDOW_WIDTH", window.innerWidth);
    const { width: windowWidth } = useWindowSize();
    watch(windowWidth, (val) => {
      store.commit("app/UPDATE_WINDOW_WIDTH", val);
    });
    return { skin, skinClasses };
  },
};
</script>

<style lang="scss"></style>
