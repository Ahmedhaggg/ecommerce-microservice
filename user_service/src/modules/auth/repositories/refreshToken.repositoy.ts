import { BaseRepository } from '@common/baseRepository/BaseRepository';
import { RefreshToken } from '../entities/refreshToken.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class RefreshTokenRepository extends BaseRepository<RefreshToken> {
  constructor(
    @InjectRepository(RefreshToken)
    protected refreshTokenRepo: Repository<RefreshToken>,
  ) {
    super(refreshTokenRepo);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return await this.refreshTokenRepo.findOne({
      where: { token },
      relations: ['user'],
    });
  }
}
