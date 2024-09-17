import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Role } from "@prisma/client";
import { verify } from "argon2";
import { Response } from "express";
// import { EmailService } from 'src/email/email.service'
import { PrismaService } from "src/prisma.service";
import { UserService } from "src/user/user.service";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 1;
  REFRESH_TOKEN_NAME = "refreshToken";

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private userService: UserService,
    // private emailService: EmailService
  ) {}

  async login(dto: AuthDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.validateUser(dto);
    const tokens = await this.issueTokens(user.id, user.role);

    return {
      user,
      ...tokens,
    };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userService.findByEmail(dto.email);

    if (oldUser) throw new BadRequestException("User already exists");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.create(dto);

    const tokens = await this.issueTokens(user.id, user.role);

    // await this.emailService.sendWelcome(user.email)

    return {
      user,
      ...tokens,
    };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException("Invalid refresh token");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userService.findById(result.id);

    const tokens = await this.issueTokens(user.id, user.role);

    return {
      user,
      ...tokens,
    };
  }

  private async issueTokens(userId: number, role?: Role) {
    const data = { id: userId, role };

    const accessToken = this.jwt.sign(data, {
      expiresIn: "1h",
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) throw new UnauthorizedException("Email or password invalid");

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException("Email or password invalid");

    return user;
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: "localhost",
      expires: expiresIn,
      // true if production
      secure: true,
      // lax if production
      sameSite: "none",
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, "", {
      httpOnly: true,
      domain: "localhost",
      expires: new Date(0),
      // true if production
      secure: true,
      // lax if production
      sameSite: "none",
    });
  }
}
