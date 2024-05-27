import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { DetectDeviceService } from '../services/detect-device.service';

export const canMatchDeviceMobile: CanMatchFn = () => {
  const detectDeviceService = inject(DetectDeviceService);
  const isMobile = detectDeviceService.isMobile();

  return isMobile;
};

export const canMatchDeviceDesktop: CanMatchFn = () => {
  const detectDeviceService = inject(DetectDeviceService);
  const isMobile = detectDeviceService.isMobile();
  return !isMobile;
};
