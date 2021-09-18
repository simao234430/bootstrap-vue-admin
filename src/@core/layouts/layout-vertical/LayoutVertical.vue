<template>
  <div
    class="vertical-layout h-100"
    :class="[layoutClasses]"
    :data-col="isNavMenuHidden ? '1-column' : null"
  >
    <!-- Navbar -->
    <!-- <b-navbar
      :toggleable="false"
      :variant="navbarBackgroundColor"
      class="header-navbar navbar navbar-shadow align-items-center"
      :class="[navbarTypeClass]"
    >
      <slot
        name="navbar"
        :toggleVerticalMenuActive="toggleVerticalMenuActive"
        :navbarBackgroundColor="navbarBackgroundColor"
        :navbarTypeClass="[
          ...navbarTypeClass,
          'header-navbar navbar navbar-shadow align-items-center',
        ]"
      >
        <app-navbar-vertical-layout
          :toggle-vertical-menu-active="toggleVerticalMenuActive"
        />
      </slot>
    </b-navbar> -->
    <!--/ Navbar -->

    <!-- Vertical Nav Menu -->
    <vertical-nav-menu
      v-if="!isNavMenuHidden"
      :is-vertical-menu-active="isVerticalMenuActive"
      :toggle-vertical-menu-active="toggleVerticalMenuActive"
    >
      <template #header="slotProps">
        <slot name="vertical-menu-header" v-bind="slotProps" />
      </template>
    </vertical-nav-menu>
    <!-- /Vertical Nav Menu -->

    <!-- Vertical Nav Menu Overlay -->
    <div
      class="sidenav-overlay"
      :class="overlayClasses"
      @click="isVerticalMenuActive = false"
    />
    <!-- /Vertical Nav Menu Overlay -->
  </div>
</template>

<script>
import { onUnmounted } from "@vue/composition-api";

import useAppConfig from "@core/app-config/useAppConfig";

import VerticalNavMenu from "./components/vertical-nav-menu/VerticalNavMenu.vue";
import useVerticalLayout from "./useVerticalLayout";
import mixinVerticalLayout from "./mixinVerticalLayout";

export default {
  components: {
    // AppBreadcrumb,
    // AppNavbarVerticalLayout,
    // AppFooter,
    VerticalNavMenu,

    //   LayoutContentRendererLeftDetached,
    //   LayoutContentRendererLeft,
    //   LayoutContentRendererDefault,
  },
  mixins: [mixinVerticalLayout],
  computed: {
    // layoutContentRenderer() {
    //   const rendererType = this.$route.meta.contentRenderer;
    //   if (rendererType === "sidebar-left")
    //     return "layout-content-renderer-left";
    //   if (rendererType === "sidebar-left-detached")
    //     return "layout-content-renderer-left-detached";
    //   return "layout-content-renderer-default";
    // },
  },
  setup() {
    const {
      routerTransition,
      navbarBackgroundColor,
      navbarType,
      footerType,
      isNavMenuHidden,
    } = useAppConfig();

    const {
      isVerticalMenuActive,
      toggleVerticalMenuActive,
      isVerticalMenuCollapsed,
      layoutClasses,
      overlayClasses,
      resizeHandler,
      navbarTypeClass,
      footerTypeClass,
    } = useVerticalLayout(navbarType, footerType);

    // Resize handler
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    onUnmounted(() => {
      window.removeEventListener("resize", resizeHandler);
    });

    return {
      isVerticalMenuActive,
      toggleVerticalMenuActive,
      isVerticalMenuCollapsed,
      overlayClasses,
      layoutClasses,
      navbarTypeClass,
      footerTypeClass,

      // App Config
      routerTransition,
      navbarBackgroundColor,
      isNavMenuHidden,
    };
  },
};
</script>

<style lang="scss">
@import "~@core/scss/base/themes/bordered-layout.scss";
</style>
