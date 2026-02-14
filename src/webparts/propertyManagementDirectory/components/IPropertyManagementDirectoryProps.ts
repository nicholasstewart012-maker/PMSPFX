import { ISharePointService } from "../../../services/ISharePointService";

export interface IPropertyManagementDirectoryProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  service: ISharePointService;
  listTitle: string;
}
