<!-- Store map [BEGIN] -->
<div class="o-page-width o-page-width--map jq-tab-block">
  <div class="c-store-map">
    <div class="c-store-map__content" id="jq-mobile-map">
      <div class="c-store-map__floor-list">
        <a href="#map-store-1-floor" class="c-store-map__floor-link jq-tab-link">
          <i>
            <span class="jq-bp-svg c-store-map__floor-pattern" data-src="<?php echo $_SETTING['baseURL']; ?>images/map_floor.svg"></span>
            <span class="jq-bp-svg c-store-map__floor-pattern--mobile" data-src="<?php echo $_SETTING['baseURL']; ?>images/map_floor_mobile.svg"></span>
          </i>
          <span>
            <span>1</span>
            <span>patro</span>
          </span>
        </a>

        <a href="#map-store-0-floor" class="c-store-map__floor-link jq-tab-link">
          <i>
            <span class="jq-bp-svg c-store-map__floor-pattern" data-src="<?php echo $_SETTING['baseURL']; ?>images/map_floor.svg"></span>
            <span class="jq-bp-svg c-store-map__floor-pattern--mobile" data-src="<?php echo $_SETTING['baseURL']; ?>images/map_floor_mobile.svg"></span>
          </i>
          <span>
            <span>0</span>
            <span>přízemí</span>
          </span>
        </a>

        <a href="#map-store--1-floor" class="c-store-map__floor-link jq-tab-link">
          <i>
            <span class="jq-bp-svg c-store-map__floor-pattern" data-src="<?php echo $_SETTING['baseURL']; ?>images/map_floor.svg"></span>
            <span class="jq-bp-svg c-store-map__floor-pattern--mobile" data-src="<?php echo $_SETTING['baseURL']; ?>images/map_floor_mobile.svg"></span>
          </i>
          <span>
            <span>-1</span>
            <span>patro</span>
          </span>
        </a>
      </div>
      <div class="c-store-map__map-list jq-mobile-map-list">
        <div class="c-store-map__map-list-content jq-mobile-map-content">
          <div class="c-store-map__map jq-tab" id="map-store-1-floor">
            <?php include $_SETTING['baseDIR'] . 'modules/map_store_1.php'; ?>
          </div>

          <div class="c-store-map__map jq-tab" id="map-store-0-floor" style="display: none;">
            <?php include $_SETTING['baseDIR'] . 'modules/map_store_0.php'; ?>          
          </div>

          <div class="c-store-map__map jq-tab" id="map-store--1-floor" style="display: none;">
            <?php include $_SETTING['baseDIR'] . 'modules/map_store_-1.php'; ?>  
          </div>        
        </div>
      </div>
      <div class="c-store-map__close-bar">        
        <a class="c-store-map__close-bar-logo" href="<?php echo $_SETTING['baseURL']; ?>">
          <span class="jq-bp-svg" data-src="<?php echo $_SETTING['baseURL']; ?>images/logo.svg"></span>
        </a>
        <button class="c-store-map__close-bar-button jq-mobile-map-close">
          <span class="jq-bp-svg" data-src="<?php echo $_SETTING['baseURL']; ?>images/ico_close.svg"></span>
        </button>        
      </div>
    </div>
    <div class="c-store-map__content-mobile">
      <div class="c-store-map__image-box">
        <img src="<?php echo $_SETTING['baseURL']; ?>images/static_map.png" />
      </div>
      <div class="h-text-center">
        <button class="o-button jq-mobile-map-open">Zobrazit plánek</button>
      </div>
    </div>    
  </div>
</div>
<!-- Store map [END] -->