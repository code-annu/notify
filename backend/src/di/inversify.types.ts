const TYPES = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  ISessionRepository: Symbol.for("ISessionRepository"),
  IAppRepository: Symbol.for("IAppRepository"),
  IAppChannelRepository: Symbol.for("IAppChannelRepository"),
  IAppUserRepository: Symbol.for("IAppUserRepository"),

  // Authentication Usecase
  SignupUsecase: Symbol.for("SignupUsecase"),
  LoginUsecase: Symbol.for("LoginUsecase"),
  RefreshTokenUsecase: Symbol.for("RefreshTokenUsecase"),

  // Profile Usecase
  GetProfileUsecase: Symbol.for("GetProfileUsecase"),
  DeleteProfileUsecase: Symbol.for("DeleteProfileUsecase"),
  UpdateProfileUsecase: Symbol.for("UpdateProfileUsecase"),

  // User App Usecase
  CreateAppUsecase: Symbol.for("CreateAppUsecase"),
  DeleteAppUsecase: Symbol.for("DeleteAppUsecase"),
  GetAppUsecase: Symbol.for("GetAppUsecase"),
  GetUsersAppUsecase: Symbol.for("GetUsersAppUsecase"),
  UpdateAppUsecase: Symbol.for("UpdateAppUsecase"),
  ToggleAppStateUsecase: Symbol.for("ToggleAppStateUsecase"),

  // App Channel Usecase
  CreateAppChannelUsecase: Symbol.for("CreateAppChannelUsecase"),
  DeleteAppChannelUsecase: Symbol.for("DeleteAppChannelUsecase"),
  GetAppChannelUsecase: Symbol.for("GetAppChannelUsecase"),
  GetAppChannelsUsecase: Symbol.for("GetAppChannelsUsecase"),
  ToggleAppChannelStateUsecase: Symbol.for("ToggleAppChannelStateUsecase"),

  // App User Usecase
  AddAppUsersUsecase: Symbol.for("AddAppUsersUsecase"),
  DeleteAppUserUsecase: Symbol.for("DeleteAppUserUsecase"),
  DeleteAppUsersUsecase: Symbol.for("DeleteAppUsersUsecase"),
  GetAppUserUsecase: Symbol.for("GetAppUserUsecase"),
  GetAppUsersUsecase: Symbol.for("GetAppUsersUsecase"),
  UpdateAppUserUsecase: Symbol.for("UpdateAppUserUsecase"),

  // Controller
  AuthController: Symbol.for("AuthController"),
  ProfileController: Symbol.for("ProfileController"),
  AppController: Symbol.for("AppController"),
  AppChannelController: Symbol.for("AppChannelController"),
  AppUserController: Symbol.for("AppUserController"),
};

export default TYPES;
