# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

### Function Visibility Specifiers

open in Remix

function myFunction() <visibility specifier> returns (bool) {
return true;
}
public: visible externally and internally (creates a getter function for storage/state variables)

private: only visible in the current contract

external: only visible externally (only for functions) - i.e. can only be message-called (via this.func)

internal: only visible internally

Modifiers
pure for functions: Disallows modification or access of state.

view for functions: Disallows modification of state.

payable for functions: Allows them to receive Ether together with a call.

constant for state variables: Disallows assignment (except initialization), does not occupy storage slot.

immutable for state variables: Allows assignment at construction time and is constant when deployed. Is stored in code.

anonymous for events: Does not store event signature as topic.

indexed for event parameters: Stores the parameter as topic.

virtual for functions and modifiers: Allows the function’s or modifier’s behavior to be changed in derived contracts.

override: States that this function, modifier or public state variable changes the behavior of a function or modifier in a base contract.

In Solidity, we use the memory keyword to store the data temporarily during the execution of a smart contract.
When a variable is declared using the memory keyword, it is stored in the memory area of the EVM. This is the default storage location for variables in Solidity.

In Solidity, memory, calldata, and storage are keywords used to specify the location where data should be stored. They have different uses and implications for function arguments. Here's a detailed explanation:

memory:

Temporary Storage: The memory keyword is used for temporary variables that are only needed during the execution of the function. Once the function execution is finished, the data stored in memory is discarded.
Usage: Suitable for variables that do not need to be persistent and are only required within the function's scope.
Cost: Generally more expensive than calldata because memory is read and written during function execution, but less expensive than storage.
calldata:

Immutable and Temporary Storage: The calldata keyword is used for function arguments that are read-only and are provided by external function calls. Data in calldata cannot be modified.
Usage: Typically used for external function call arguments and is efficient for reading data because it is directly passed from the call data without copying it to memory.
Cost: It is the most gas-efficient way to pass data to a function because it involves minimal data copying.
storage:

Permanent Storage: The storage keyword is used for variables that need to be persistent between function calls. This is where contract state variables are stored.
Usage: Suitable for variables that represent the contract's state and need to be retained even after the function execution completes.
Cost: Accessing and modifying storage is the most expensive operation in terms of gas costs because it involves reading from and writing to the blockchain.
Summary
memory: Temporary, mutable, function-local variables.
calldata: Temporary, immutable, external function call arguments.
storage: Permanent, mutable, contract state variables.
