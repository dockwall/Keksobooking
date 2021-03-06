'use strict';

(function () {
  const KEY_CODES = {
    ESC: 27,
    ENTER: 13,
  };

  const MAIN_PIN_TAIL_LENGTH = 16;

  const ALL_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  const TYPES_DICT = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
  };

  const OFFER_PIN_SIZE = {
    WIDTH: 50,
    HEIGHT: 70,
  };

  const ROOM_CAPACITIES = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  };

  const MIN_PRICES = {
    'bungalow': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  const DEFAULT_MAIN_PIN_POSITION = {
    X: 570,
    Y: 375,
  };

  const ACTIVE_MAP_BORDERS = {
    LEFT: 0,
    RIGHT: 1200,
    TOP: 130,
    BOTTOM: 630,
  };

  const OFFER_LOCATION_OPTIONS = {
    X: {
      MIN: 300,
      MAX: 900,
    },
    Y: {
      MIN: 130,
      MAX: 630,
    },
  };

  const template = document.querySelector('template').content;

  window.constants = {
    template,
    allFeatures: ALL_FEATURES,
    typesDict: TYPES_DICT,
    offerPinSize: OFFER_PIN_SIZE,
    mainPinTailLength: MAIN_PIN_TAIL_LENGTH,
    roomCapacities: ROOM_CAPACITIES,
    minPrices: MIN_PRICES,
    defaultMainPinPosition: DEFAULT_MAIN_PIN_POSITION,
    activeMapBorders: ACTIVE_MAP_BORDERS,
    keyCodes: KEY_CODES,
    offerLocationOptions: OFFER_LOCATION_OPTIONS,
  };
})();


