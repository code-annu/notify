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

const container = new Container();

// Bind repositories
container.bind(TYPES.ISessionRepository).to(PrismaSessionRepository);
container.bind(TYPES.IUserRepository).to(PrismaUserRepository);
container.bind(TYPES.IAppRepository).to(PrismaAppRepository);

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

// Bind controllers
container.bind(TYPES.AuthController).to(AuthController);
container.bind(TYPES.ProfileController).to(ProfileController);
container.bind(TYPES.AppController).to(AppController);

export default container;
