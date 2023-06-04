import { ReactElement, ReactNode } from 'react';
import RateStars from '../components/RateStars/RateStars';
import {
  CanceledIcon,
  DeliveredIcon,
  InTransitIcon,
  PreparingIcon,
} from '../assests/icons';

export enum STEPS {
  CART_STEP,
  CHECKOUT_STEP,
}

export enum PAYMENT_METHODS {
  CREDIT_CARD = 'CREDIT_CARD',
  MB_MONEY = 'MB_MONEY',
}

export const rateOptions: { value: number; label: ReactElement }[] = [
  {
    value: 1,
    label: <RateStars rate={1} />,
  },
  {
    value: 2,
    label: <RateStars rate={2} />,
  },
  {
    value: 3,
    label: <RateStars rate={3} />,
  },
  {
    value: 4,
    label: <RateStars rate={4} />,
  },
  {
    value: 5,
    label: <RateStars rate={5} />,
  },
];

export const SHIPMENT_STATES = {
  PREPARING: 'PREPARING',
  DELIVERED: 'DELIVERED',
  IN_TRANSIT: 'IN_TRANSIT',
  CANCELED: 'CANCELED',
  NOT_DELIVERED: 'NOT_DELIVERED',
};

export enum SHIPMENT_ENUM {
  PREPARING = 'PREPARING',
  DELIVERED = 'DELIVERED',
  IN_TRANSIT = 'IN_TRANSIT',
  CANCELED = 'CANCELED',
  NOT_DELIVERED = 'NOT_DELIVERED',
}

export const SHIPMENT_STATUSES: {
  [key in SHIPMENT_ENUM]: {
    secondaryColor: string;
    primaryColor: string;
    description: string;
    icon: ReactNode;
  };
} = {
  PREPARING: {
    secondaryColor: '#fcf5dd',
    primaryColor: '#FFC107',
    description: 'Still Preparing',
    icon: <PreparingIcon />,
  },
  DELIVERED: {
    secondaryColor: '#e0f7e0',
    primaryColor: '#4CAF50',
    description: 'Delivered',
    icon: <DeliveredIcon />,
  },
  IN_TRANSIT: {
    secondaryColor: '#e3eef9',
    primaryColor: '#2196F3',
    description: 'On Route',
    icon: <InTransitIcon />,
  },
  CANCELED: {
    secondaryColor: '#fee1de',
    primaryColor: '#F44336',
    description: 'Canceled',
    icon: <CanceledIcon />,
  },
  NOT_DELIVERED: {
    secondaryColor: '#fee1de',
    primaryColor: '#F44336',
    description: 'Not Delivered',
    icon: <CanceledIcon />,
  },
};

export const MB_MONEY_UPLOAD_OPTIONS: number[] = [
  5, 10, 20, 50, 100, 200, 500, 1000, 10000,
];
