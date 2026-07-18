/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Benefit {
  id: string;
  title: string;
  metric: string;
  description: string;
  iconName: string;
}

export interface Objective {
  id: string;
  title: string;
  description: string;
  details: string;
  iconName: string;
}

export interface ProjectComponent {
  id: string;
  title: string;
  description: string;
  phase: string;
  details: string;
  iconName: string;
}

export interface FutureExpansion {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface SocialLink {
  name: string;
  url: string;
  iconName: string;
}

export interface DownloadResource {
  id: string;
  title: string;
  type: string;
  size: string;
  description: string;
}
