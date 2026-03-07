import { Container } from "inversify";
import LoginUsecase from "../application/usecase/authentication/LoginUsecase";
import RefreshTokenUsecase from "../application/usecase/authentication/RefreshTokenUsecase";
import SignupUsecase from "../application/usecase/authentication/SignupUsecase";
import TYPES from "./inversify.types";
import PrismaUserRepository from "../infrastructure/repository/PrismaUserRepository";
import PrismaSessionRepository from "../infrastructure/repository/PrismaSessionRepository";
import AuthController from "../api/controller/AuthController";
import ProfileController from "../api/controller/ProfileController";
import DeleteProfileUsecase from "../application/usecase/profile/DeleteProfileUsecase";
import GetProfileUsecase from "../application/usecase/profile/GetProfileUsecase";
import UpdateProfileUsecase from "../application/usecase/profile/UpdateProfileUsecase";
import CreateAppUsecase from "../application/usecase/user_app/CreateAppUsecase";
import DeleteAppUsecase from "../application/usecase/user_app/DeleteAppUsecase";
import GetAppUsecase from "../application/usecase/user_app/GetAppUsecase";
import GetUsersAppUsecase from "../application/usecase/user_app/GetUsersAppUsecase";
import UpdateAppUsecase from "../application/usecase/user_app/UpdateAppUsecase";
import ToggleAppStateUsecase from "../application/usecase/user_app/ToggleAppStateUsecase";
import AppController from "../api/controller/AppController";
import PrismaAppRepository from "../infrastructure/repository/PrismaAppRepository";
import AppChannelController from "../api/controller/AppChannelController";
import CreateAppChannelUsecase from "../application/usecase/app_channel/CreateAppChannelUsecase";
import DeleteAppChannelUsecase from "../application/usecase/app_channel/DeleteAppChannelUsecase";
import GetAppChannelsUsecase from "../application/usecase/app_channel/GetAppChannelsUsecase";
import GetAppChannelUsecase from "../application/usecase/app_channel/GetAppChannelUsecase";
import ToggleAppChannelStateUsecase from "../application/usecase/app_channel/ToggleAppChannelStateUsecase";
import PrismaAppChannelRepository from "../infrastructure/repository/PrismaAppChannelRepository";
import PrismaAppUserRepository from "../infrastructure/repository/PrismaAppUserRepository";
import AddAppUsersUsecase from "../application/usecase/app_users/AddAppUsersUsecase";
import DeleteAppUsersUsecase from "../application/usecase/app_users/DeleteAppUsersUsecase";
import DeleteAppUserUsecase from "../application/usecase/app_users/DeleteAppUserUsecase";
import GetAppUsersUsecase from "../application/usecase/app_users/GetAppUsersUsecase";
import GetAppUserUsecase from "../application/usecase/app_users/GetAppUserUsecase";
import UpdateAppUserUsecase from "../application/usecase/app_users/UpdateAppUserUsecase";
import AppUserController from "../api/controller/AppUserController";
import SendEmailNotificationUsecase from "../application/usecase/notify/SendEmailNotificationUsecase";
import NotifyController from "../api/controller/NotifyController";

const container = new Container();

// Bind repositories
container.bind(TYPES.ISessionRepository).to(PrismaSessionRepository);
container.bind(TYPES.IUserRepository).to(PrismaUserRepository);
container.bind(TYPES.IAppRepository).to(PrismaAppRepository);
container.bind(TYPES.IAppChannelRepository).to(PrismaAppChannelRepository);
container.bind(TYPES.IAppUserRepository).to(PrismaAppUserRepository);

// Bind Authentication usecase
container.bind(TYPES.SignupUsecase).to(SignupUsecase);
container.bind(TYPES.LoginUsecase).to(LoginUsecase);
container.bind(TYPES.RefreshTokenUsecase).to(RefreshTokenUsecase);

// Bind Profile usecase
container.bind(TYPES.GetProfileUsecase).to(GetProfileUsecase);
container.bind(TYPES.UpdateProfileUsecase).to(UpdateProfileUsecase);
container.bind(TYPES.DeleteProfileUsecase).to(DeleteProfileUsecase);

// Bind App usecase
container.bind(TYPES.CreateAppUsecase).to(CreateAppUsecase);
container.bind(TYPES.UpdateAppUsecase).to(UpdateAppUsecase);
container.bind(TYPES.DeleteAppUsecase).to(DeleteAppUsecase);
container.bind(TYPES.GetAppUsecase).to(GetAppUsecase);
container.bind(TYPES.GetUsersAppUsecase).to(GetUsersAppUsecase);
container.bind(TYPES.ToggleAppStateUsecase).to(ToggleAppStateUsecase);

// Bind App Channel usecase
container.bind(TYPES.CreateAppChannelUsecase).to(CreateAppChannelUsecase);
container.bind(TYPES.DeleteAppChannelUsecase).to(DeleteAppChannelUsecase);
container.bind(TYPES.GetAppChannelUsecase).to(GetAppChannelUsecase);
container.bind(TYPES.GetAppChannelsUsecase).to(GetAppChannelsUsecase);
container
  .bind(TYPES.ToggleAppChannelStateUsecase)
  .to(ToggleAppChannelStateUsecase);

// Bind App User usecase
container.bind(TYPES.AddAppUsersUsecase).to(AddAppUsersUsecase);
container.bind(TYPES.UpdateAppUserUsecase).to(UpdateAppUserUsecase);
container.bind(TYPES.DeleteAppUserUsecase).to(DeleteAppUserUsecase);
container.bind(TYPES.GetAppUserUsecase).to(GetAppUserUsecase);
container.bind(TYPES.GetAppUsersUsecase).to(GetAppUsersUsecase);
container.bind(TYPES.DeleteAppUsersUsecase).to(DeleteAppUsersUsecase);

// Bind Notify usecase
container
  .bind(TYPES.SendEmailNotificationUsecase)
  .to(SendEmailNotificationUsecase);

// Bind controllers
container.bind(TYPES.AuthController).to(AuthController);
container.bind(TYPES.ProfileController).to(ProfileController);
container.bind(TYPES.AppController).to(AppController);
container.bind(TYPES.AppChannelController).to(AppChannelController);
container.bind(TYPES.AppUserController).to(AppUserController);
container.bind(TYPES.NotifyController).to(NotifyController);

export default container;
