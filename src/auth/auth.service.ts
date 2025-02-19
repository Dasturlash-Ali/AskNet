import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
  } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { CreateAdminDto } from "src/admin/dto/create-admin.dto";
import { AdminService } from "src/admin/admin.service";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { AdminDocument } from "../admin/schemas/admin.schemas";
import { SignInDto } from "./dto/signin.dto";
  
  @Injectable()
  export class AuthService {
    constructor(
      private readonly jwtService: JwtService,
      private readonly adminService: AdminService
    ) {}
  
    async getToken(admin: AdminDocument) {
      const payload = {
        id: admin._id,
        is_active: admin.is_active,
        is_creator: admin.is_creator,
      };
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(payload, {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME,
        }),
        this.jwtService.signAsync(payload, {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME,
        }),
      ]);
      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    }
    async signUp(createAdminDto: CreateAdminDto) {
      const condiate = await this.adminService.findByEmail(createAdminDto.email);
      if (condiate) {
        throw new BadRequestException("Bunday Admin mavjud");
      }
      const newAdmin = await this.adminService.create(createAdminDto);
  
      const response = {
        message: "Sign Up success",
        adminId: newAdmin._id,
      };
  
      return response;
    }
  
    async signIn(signInDto: SignInDto, res: Response) {
      const { email, password } = signInDto;
  
      if (!email || !password) {
        throw new BadRequestException();
      }
  
      const admin = await this.adminService.findByEmail(email);
  
      if (!admin) {
        throw new UnauthorizedException("Invalid Email or password");
      }
      if (!admin.is_active) {
        throw new UnauthorizedException("admin is not activate");
      }
      const validPassword = await bcrypt.compare(
        signInDto.password,
        admin.hashed_password
      );
      if (!validPassword) {
        throw new UnauthorizedException("Invalid Email or password");
      }
  
      const tokens = await this.getToken(admin);
  
      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
  
      const updateAdmin = await this.adminService.updateRefreshToken(
        admin.id,
        hashed_refresh_token
      );
      if (!updateAdmin) {
        throw new InternalServerErrorException("Tokenni saqlashda xatolik");
      }
      res.cookie("refresh_token", tokens.refresh_token, {
        maxAge: 15 * 24 * 60 * 60 * 100,
        httpOnly: true,
      });
      const response = {
        message: "Admin logged in",
        adminId: admin.id,
        access_token: tokens.access_token,
      };
  
      return response;
    }
  
    async signOut(refreshToken: string, res: Response) {
      const userData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      if (!userData) {
        throw new ForbiddenException("User not verified");
      }
      const hashed_refresh_token = null;
      await this.adminService.updateRefreshToken(
        userData.id,
        hashed_refresh_token
      );
  
      res.clearCookie("refresh_token");
  
      const response = {
        message: "Logged out successfully",
      };
      return response;
    }
  
  
  
    
    create(createAuthDto: CreateAuthDto) {
      return "This action adds a new auth";
    }
  
    findAll() {
      return `This action returns all auth`;
    }
  
    findOne(id: number) {
      return `This action returns a #${id} auth`;
    }
  
    update(id: number, updateAuthDto: UpdateAuthDto) {
      return `This action updates a #${id} auth`;
    }
  
    remove(id: number) {
      return `This action removes a #${id} auth`;
    }
  }
  