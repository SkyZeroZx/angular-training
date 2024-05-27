import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { REQUEST } from '../tokens/express.token';
import { isMobile } from '../utils/is-mobile/is-mobile.util';
import { Request } from 'express';

@Injectable({
  providedIn: 'root',
})
export class DetectDeviceService {
  private userAgent: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Optional() @Inject(REQUEST) private request: Request
  ) {
    if (isPlatformServer(this.platformId)) {
      this.userAgent = this.request?.headers?.['user-agent'] || '';
    } else {
      this.userAgent = navigator.userAgent;
    }
  }

  isMobile() {
    return isMobile(this.userAgent);
  }
}
