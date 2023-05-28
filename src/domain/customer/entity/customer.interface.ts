import Address from '../value-object/address'

export default interface CustomerInterface {
    get id(): string
    get name(): string
    get address(): Address | undefined
    get active(): boolean
    get rewardPoints(): number

    activate(): void
    deactivate(): void
    addRewardPoints(rewardPoints: number): void
    changeAddress(address?: Address): void
    changeName(name: string): void
}
