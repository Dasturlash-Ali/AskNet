import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    HttpCode,
    HttpStatus,
  } from "@nestjs/common";
  import { AuthService } from "./auth.service";
  import { UpdateAuthDto } from "./dto/update-auth.dto";
  import { CreateAdminDto } from "src/admin/dto/create-admin.dto";
  import { Response } from "express";
  import { CookieGetter } from "src/decorators/cookie-getter.decorator";
import { SignInDto } from "./dto/signin.dto";
  
  @Controller("auth")
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post("sign-up")
    signUp(@Body() createAdminDto: CreateAdminDto) {
      return this.authService.signUp(createAdminDto);
    }
  
    @Post("sign-in")
    signIn(
      @Body() signInDto: SignInDto,
      @Res({ passthrough: true }) res: Response
    ) {
      return this.authService.signIn(signInDto, res);
    }
  
    @HttpCode(HttpStatus.OK)
    @Get("sign-out")
    signout(
      @CookieGetter("refresh_token") refreshToken: string,
      @Res({ passthrough: true }) res: Response
    ) {
      return this.authService.signOut(refreshToken, res)
    }
  
    @Get()
    findAll() {
      return this.authService.findAll();
    }
  
    @Get(":id")
    findOne(@Param("id") id: string) {
      return this.authService.findOne(+id);
    }
  
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateAuthDto: UpdateAuthDto) {
      return this.authService.update(+id, updateAuthDto);
    }
  
    @Delete(":id")
    remove(@Param("id") id: string) {
      return this.authService.remove(+id);
    }
  }
  