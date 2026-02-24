const TYPES = {
  // Repositories
  IUserRepository: Symbol.for("IUserRepository"),
  ISessionRepository: Symbol.for("ISessionRepository"),
  IAppRepository: Symbol.for("IAppRepository"),

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

  // Controller
  AuthController: Symbol.for("AuthController"),
  ProfileController: Symbol.for("ProfileController"),
  AppController: Symbol.for("AppController"),
};

export default TYPES;
