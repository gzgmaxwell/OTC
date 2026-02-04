<template>
      <el-dialog :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <div tabindex="0" style="outline: none;">
        <div class="ant-modal-content">
       
          <div class="ant-modal-header">
            <div class="ant-modal-title" id="vcDialogTitle0">
              <div
                data-v-0391810e
                class="text-[1.2rem] font-[700] leading-[1.85rem] text-center"
              >{{$t('user')}}</div>
            </div>
          </div>
          <div class="ant-modal-body">
            <div data-v-0391810e class="overflow-y-auto h-[25.6rem] modal-scrollbar">
              <div
                data-v-0391810e
                class="w-full flex flex-col gap-[0.8rem] text-[0.8rem] font-[400] leading-[1.2rem] text-[#555555]"
              >
                <div data-v-0391810e class="w-full flex flex-col gap-[0.8rem]">
                  <p data-v-0391810e class="p-highlight-processed">
                    {{$t('welcome')}}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{$t('service')}}!
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    {{$t('before')}} "
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{$t(('userService')) }}
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    {{ $t(('whenYou')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>,{{ $t(('itMeans')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>{{ $t(('sAnswer')) }}.
                  </p>
                  <p
                    data-v-0391810e
                  >{{ $t(('ifYou')) }}</p>
                </div>
                <div data-v-0391810e class="w-full flex flex-col gap-[0.8rem]">
                  <p
                    data-v-0391810e
                    class="text-[0.9rem] font-[700] leading-[1.35rem] text-[#252A34]"
                  >1. {{ $t(('parties')) }}</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    {{ $t(('thisAgree')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('through')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('mobileClient')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>.
                  </p>
                </div>
                <div data-v-0391810e class="w-full flex flex-col gap-[0.8rem]">
                  <p
                    data-v-0391810e
                    class="text-[0.9rem] font-[700] leading-[1.35rem] text-[#252A34]"
                  >2. </p>
                  <p
                    data-v-0391810e
                  >1. {{ $t(('theContent')) }}</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    2.
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>{{ $t(('hasThe')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>{{ $t(('servicesIf')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('servicesOr')) }}
                  </p>
                </div>
                <div data-v-0391810e class="w-full flex flex-col gap-[0.8rem]">
                  <p
                    data-v-0391810e
                    class="text-[0.9rem] font-[700] leading-[1.35rem] text-[#252A34]"
                  >3. {{ $t(('serviceContent')) }}</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    1.
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('providesMobile')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('shall')) }}.
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('willContinue')) }}.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    2.
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>  {{ $t(('allowsYou')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('softwareNon')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>, {{ $t(('andYou')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('whenExercising')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('failsTo')) }}
                  </p>
                  <p
                    data-v-0391810e
                  >3. {{ $t(('TheContentOf')) }}</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    4. {{ $t(('atThe')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('reservesThe')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('doesNot')) }}
                  </p>
                </div>
                <div data-v-0391810e class="w-full flex flex-col gap-[0.8rem]">
                  <p
                    data-v-0391810e
                    class="text-[0.9rem] font-[700] leading-[1.35rem] text-[#252A34]"
                  >4. {{ $t(('registrationAnd')) }}</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    1.{{ $t(('youConfirm')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>, {{ $t(('youShould')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('hasTheRight')) }}
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    2.  {{ $t(('whenRregistering')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('accountIn')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('reservesThenot')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('accountAnd')) }}
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    3.  {{ $t(('youCan')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>  {{ $t(('asAn')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('hasYou')) }}
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    4. {{ $t(('youUnderstand')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>  {{ $t(('registeredAccount')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>. {{ $t(('afterThe')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>  {{ $t(('accountOnly')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('immediatelyHas')) }}
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    5. {{ $t(('successfullyAfter')) }},
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>{{ $t(('identityWill')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('beNotified')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('responsibleWill')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>,{{ $t(('otherwise')) }}
                  </p>
                </div>
                <div data-v-0391810e class="w-full flex flex-col gap-[0.8rem]">
                  <p
                    data-v-0391810e
                    class="text-[0.9rem] font-[700] leading-[1.35rem] text-[#252A34]"
                  >5. {{ $t(('usageService')) }}</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    1.  {{ $t(('userThe')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('onlyProvides')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>  {{ $t(('serviceInformation')) }}
                  </p>
                  <p
                    data-v-0391810e
                  >2.{{ $t(('shallYou')) }}</p>
                  <p
                    data-v-0391810e
                  >3. {{ $t(('otherwiseUnless')) }}</p>
                  <p
                    data-v-0391810e
                  >4. {{ $t(('promiseYou')) }}</p>
                  <p
                    data-v-0391810e
                  >4.1 {{ $t(('transmitUpload')) }} </p>
                  <p
                    data-v-0391810e
                  >(a) {{ $t(('theOpposing')) }}</p>
                  <p
                    data-v-0391810e
                  >(b) {{ $t(('endangering')) }}</p>
                  <p data-v-0391810e>(c) {{ $t(('nationalDamaging')) }}</p>
                  <p
                    data-v-0391810e
                  >(d) {{ $t(('ethnicInciting')) }}</p>
                  <p
                    data-v-0391810e
                  >(e) {{ $t(('nationalUndermining')) }}</p>
                  <p
                    data-v-0391810e
                  >(f) {{ $t(('rumorsSpread')) }}</p>
                  <p
                    data-v-0391810e
                  >(g) {{ $t(('obscenitySpread')) }};</p>
                  <p
                    data-v-0391810e
                  >(h) {{ $t(('orInsulting')) }}</p>
                  <p
                    data-v-0391810e
                  >(i) {{ $t(('containsContent')) }}</p>
                  <p
                    data-v-0391810e
                  >(j) {{ $t(('otherContains')) }}</p>
                  <p
                    data-v-0391810e
                  >4.2 {{ $t(('anyImpersonate')) }}</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    4.3 {{ $t(('titlesForge')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('orIts')) }};
                  </p>
                  <p
                    data-v-0391810e
                  >4.4 {{ $t(('transmitUploadshare')) }}</p>
                  <p
                    data-v-0391810e
                  >4.5 {{ $t(('contentUpload')) }}</p>
                  <p
                    data-v-0391810e
                  >4.6 {{ $t(('otherwiseStalk')) }}</p>
                  <p
                    data-v-0391810e
                  >4.7 {{ $t(('transmitUploadany')) }}</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    4.8 {{ $t(('thisBecause')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>{{ $t(('bearWill')) }} 
                  </p>
                  <p
                    data-v-0391810e
                  >4.9 {{ $t(('anyConduct')) }} </p>
                  <p
                    data-v-0391810e
                  >4.10 {{ $t(('purposesFor')) }}</p>
                  <p
                    data-v-0391810e
                  >4.11  {{ $t(('ofViolations')) }}</p>
                  <p
                    data-v-0391810e
                  >4.12 {{ $t(('inEngage')) }}</p>
                  <p
                    data-v-0391810e
                  >5. {{ $t(('promiseYou')) }}</p>
                  <p
                    data-v-0391810e
                  >5.1 {{ $t(('postUpload')) }}</p>
                  <p
                    data-v-0391810e
                  >5.2 {{ $t(('withInterfere')) }}</p>
                  <p
                    data-v-0391810e
                  >5.3 {{ $t(('modifyingBy')) }}</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    5.4 {{ $t(('inLog')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>{{ $t(('produceLog')) }}
                  </p>
                  <p
                    data-v-0391810e
                  >5.5 {{ $t(('withSoftware')) }}</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    6. {{ $t(('strictlyYou')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('service')) }}.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    7.  {{ $t(('acceptYou')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('needYou')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('rightYou')) }}
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    8. {{ $t(('useYou')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>{{ $t(('commercialYou')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> {{ $t(('detrimentalYou')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">

                    9. {{ $t(('duringYou')) }}
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> services,
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> and its affiliates or its authorized units and individuals have the right to place various commercial advertisements or any other type of promotional information in various ways. At the same time, you agree Accept the above advertising or promotional information sent to you by email or other means.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    10. You fully understand and agree that you must be responsible for all actions under your registered account, including any content you publish and any consequences arising therefrom. You should make your own judgment on the content you come into contact with when using this service. and bear all risks arising from the use of the content, including risks arising from reliance on the correctness, completeness or usefulness of the content.
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> cannot and will not be responsible for any loss or damage caused by you due to the foregoing risks. .
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    11. If
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> discovers or receives reports from others that you have violated this Agreement,
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> has the right to delete or block the relevant content at any time without notice, and take measures including but not limited to withdrawing your account, restricting, suspending, and terminating your use. Part or all of this service, pursue legal liability and other measures.
                  </p>
                </div>
                <div data-v-0391810e class="w-full flex flex-col gap-[0.8rem]">
                  <p
                    data-v-0391810e
                    class="text-[0.9rem] font-[700] leading-[1.35rem] text-[#252A34]"
                  >6. Service cost</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    1. Any free trial or free functions and services of this service shall not be deemed as a waiver of
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>'s right to subsequent charges.
                  </p>
                  <p
                    data-v-0391810e
                  >2. You should pay for the Internet fees that may be incurred by using this service and the communication fees, information fees, etc. charged by other third parties.</p>
                </div>
                <div data-v-0391810e class="w-full flex flex-col gap-[0.8rem]">
                  <p
                    data-v-0391810e
                    class="text-[0.9rem] font-[700] leading-[1.35rem] text-[#252A34]"
                  >7. Special authorization</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    1. When you make any form of commitment to a
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> affiliated company, and the relevant company has confirmed that you have violated that commitment,
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> has the right to immediately take restrictive measures on your account in the manner agreed upon in your commitment, including but not limited to Suspend or terminate the provision of services to you, and publicize your breach of contract confirmed by the relevant company. You understand and agree that
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> does not need to check the facts with you for the relevant confirmation, or obtain your consent separately, and
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> does not need to take any restrictive measures or publicize this. bear any responsibility to you for your actions.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    2. Once you violate this agreement or other agreements signed with
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>,
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> has the right to notify
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> affiliates in any way and require them to take restrictive measures on your rights and interests, including but not limited to requiring
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> affiliates to suspend, Terminate some or all of its services to you and publicize your breach of contract on any website it operates or actually controls.
                  </p>
                </div>
                <div data-v-0391810e class="w-full flex flex-col gap-[0.8rem]">
                  <p
                    data-v-0391810e
                    class="text-[0.9rem] font-[700] leading-[1.35rem] text-[#252A34]"
                  >8. Third-party applications</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    1.
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> allows third-party applications to access the service platform. You can directly obtain third-party application services including but not limited to OA software on
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>. You understand and agree that
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> only serves as a platform provider, and relevant applications are independently managed by the third party. Provided,
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> assumes no responsibility for your use of this application.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    2. You understand and agree that if
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> adjusts, suspends or terminates the service or part of it, which will have an impact on third-party application services,
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> does not assume any responsibility.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    2. You understand and agree that if
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> adjusts, suspends or terminates the service or part of it, which will have an impact on third-party application services,
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> does not assume any responsibility.
                  </p>
                </div>
                <div data-v-0391810e class="w-full flex flex-col gap-[0.8rem]">
                  <p
                    data-v-0391810e
                    class="text-[0.9rem] font-[700] leading-[1.35rem] text-[#252A34]"
                  >9. Service suspension or termination</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    1. You agree that in view of the particularity of Internet services,
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> has the right to suspend, terminate or cause the suspension or termination of the service or any part thereof at any time;
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> does not need to give you a notice for the suspension or termination of free services.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    2. You understand and agree that
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> has the right to independently determine its business strategy. When
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> merges, splits, acquires, or transfers assets,
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> may transfer relevant assets under this service to a third party;
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> may also unilaterally notify you, If part or all of the services under this Agreement are transferred to a third party, the specific transferee shall be subject to the notice of
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    3. If there is one of the following breaches of contract,
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> may immediately suspend or terminate the service to the user and require the user to compensate for losses:
                  </p>
                  <p
                    data-v-0391810e
                  >3.1 The user violates the registration obligations in Article 4;</p>
                  <p
                    data-v-0391810e
                  >3.2 The user violates relevant laws and regulations or the provisions of this agreement;</p>
                  <p
                    data-v-0391810e
                  >3.3 In accordance with legal provisions or requirements of competent authorities;</p>
                  <p data-v-0391810e>3.4 For security reasons or other necessary circumstances.</p>
                </div>
                <div data-v-0391810e class="w-full flex flex-col gap-[0.8rem]">
                  <p
                    data-v-0391810e
                    class="text-[0.9rem] font-[700] leading-[1.35rem] text-[#252A34]"
                  >10. Privacy Policy</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    1. The account you registered in the
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> service has a password protection function to ensure the security of your basic information. Please keep your account and password information properly.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    2.
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> strives to take various reasonable physical, electronic and management security measures to protect your information so that your information and communication content stored in
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> will not be leaked, damaged or lost, including but not limited to SSL , information encryption storage, and data center access control.
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> also adopts strict management of employees or outsourced personnel who may be exposed to information, including but not limited to adopting different authority controls according to different positions, signing confidentiality agreements with them, and monitoring them.
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> will provide corresponding security measures based on existing technologies to protect your information and provide reasonable security protection.
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> will try its best to prevent your information from being leaked, damaged or lost at any time, but At the same time, please note that there are no absolutely perfect security measures on the information network, so please keep relevant information properly.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    3.
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> has the right to decide on its own the maximum storage period of your data in this software and services, the maximum storage space of data in the server, etc. based on the actual situation. You should keep your terminal, account and password, and properly keep relevant information and Content,
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> is not responsible for the loss or theft of data caused by your own reasons, as well as the deletion or storage failure of relevant data in this software and services.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    4. For other privacy terms, please see the "
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> Service Privacy Policy".
                  </p>
                </div>
                <div data-v-0391810e class="w-full flex flex-col gap-[0.8rem]">
                  <p
                    data-v-0391810e
                    class="text-[0.9rem] font-[700] leading-[1.35rem] text-[#252A34]"
                  >Eleven, intellectual property</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    1. You understand and agree that, unless otherwise stated by
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>, all products, technologies, software, programs, data and other information (including but not limited to text, images, pictures, photos, audio, video, All intellectual property rights (including but not limited to copyrights, trademarks, patents, trade secrets, etc.) (colors, layout design) and related rights are owned by
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> or its affiliates.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    2. You should guarantee that, unless you obtain written authorization from
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>, you shall not (and shall not allow any third party to) implement the above rights, including but not limited to renting, lending, selling, distributing, copying, modifying, reprinting, compiling, publishing, The act of publishing, restoring projects, reverse assembling, decompiling, or otherwise discovering source code, etc.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    3. The logo, "
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>", and other words, graphics and their compositions involved in the
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> service, as well as other logos, product and service names of
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> are the trademarks of
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> and its affiliated companies in local and other countries. The authorization shall not be displayed, used or otherwise processed in any way, nor shall it be shown to others that you have the right to display, use or otherwise process it.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    4. You understand and agree to authorize
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> to use your name, trademark, and logo in publicity and promotion, but only to indicate that you are a customer or partner of
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span>.
                  </p>
                </div>
                <div data-v-0391810e class="w-full flex flex-col gap-[0.8rem]">
                  <p
                    data-v-0391810e
                    class="text-[0.9rem] font-[700] leading-[1.35rem] text-[#252A34]"
                  >12. Limited liability</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    1. The service will be provided on an "as is" and "as available" basis.
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> hereby expressly states that it does not make any express or implied guarantees regarding the service, including but not limited to the applicability of the service, no errors or omissions, continuity, accuracy, reliability, and suitability for a particular purpose. , statement or promise.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    2.
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> makes no commitment or guarantee as to the validity, accuracy, correctness, reliability, quality, stability, completeness and timeliness of the technology and information involved in the service.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    3. Under no circumstances shall
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> be liable due to Internet connection failure, computer, communication or other system failure, power failure, strike, labor dispute, riot, uprising, riot, lack of productivity or production means, fire, flood , storms, explosions, force majeure, war, government actions, orders of international and domestic courts or the inaction of third parties, we shall not be liable for any failure or delay in service.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    4. Regardless of whether it is foreseeable or not, and regardless of the form of behavior,
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> shall not be liable for any special, direct, indirect, punitive, sudden or causal damage caused by the following reasons or Liability for any other damages (including but not limited to loss of profits or interest, business suspension, loss of data)
                  </p>
                  <p data-v-0391810e>4.1 Use or inability to use the service;</p>
                  <p
                    data-v-0391810e
                  >4.2 Fees incurred by purchasing or obtaining any products, samples, data, information or conducting transactions through the service, or other actions that can replace the above actions;</p>
                  <p
                    data-v-0391810e
                  >4.3 Unauthorized access or modification of data or transmission of data;</p>
                  <p
                    data-v-0391810e
                  >4.4 Statements or actions made by third parties through the service;</p>
                  <p
                    data-v-0391810e
                  >4.5 Damages caused by other service-related events, including negligence.</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    5. You fully understand and agree that due to the particularity of the Internet system and environment, the information and personal data you share in the service may be copied, reproduced, modified or used for other illegal purposes by others; you have fully hereby You are aware of the existence of such risks and confirm that such risks shall be entirely borne by you, and
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> shall not be responsible for them.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    6. You understand and agree that during the use of the service, there may be threatening, defamatory, objectionable or illegal content or behavior from any other person or infringement of other people's rights (including intellectual property rights) and The risk of anonymous or pseudonymous information shall be borne by you based on the service usage regulations, and
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> shall not be responsible for this.
                  </p>
                </div>
                <div data-v-0391810e class="w-full flex flex-col gap-[0.8rem]">
                  <p
                    data-v-0391810e
                    class="text-[0.9rem] font-[700] leading-[1.35rem] text-[#252A34]"
                  >Thirteen, liability for breach of contract and compensation</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    1. If
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> discovers or receives reports from others that you have violated this Agreement,
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> has the right to delete and block relevant content at any time without notice, and take measures including but not limited to restricting, suspending, and terminating your use of
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> accounts and services, restrict, suspend, or terminate your use of part or all of this service (including but not limited to deleting your address book, restricting the addition of members, restricting sending messages or adding friends, etc.), and pursuing legal liability and other measures.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    2. You agree that any third party may make any claim against
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> and its affiliates due to the information you upload, transmit or share through the service, use of other functions of the service, violation of this Agreement, or your infringement of any rights of others. You agree to fully compensate
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> and its affiliates for any claims or demands (including but not limited to reasonable attorneys' fees).
                  </p>
                </div>
                <div data-v-0391810e class="w-full flex flex-col gap-[0.8rem]">
                  <p
                    data-v-0391810e
                    class="text-[0.9rem] font-[700] leading-[1.35rem] text-[#252A34]"
                  >14. Effective Notice</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    1. Any notice sent by
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> to you may be sent by email, page public area announcement, personal network area prompt, mobile phone text message or regular letter, etc., and such notice shall be deemed to have been delivered to the user on the date it is sent. or take effect.
                  </p>
                  <p data-v-0391810e class="p-highlight-processed">
                    2. You agree that any notice you send to
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> shall be sent to the email, mailing address, fax number and other contact information officially announced by
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> or notified to the user in the manner described in Article 12.1, or other notifications recognized by
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> shall be used method for delivery.
                  </p>
                </div>
                <div data-v-0391810e class="w-full flex flex-col gap-[0.8rem]">
                  <p
                    data-v-0391810e
                    class="text-[0.9rem] font-[700] leading-[1.35rem] text-[#252A34]"
                  >15. Dispute Resolution and Others</p>
                  <p
                    data-v-0391810e
                  >1. The interpretation and application of this agreement, as well as disputes related to this agreement, shall be handled in accordance with the laws of the People's Republic of China.</p>
                  <p
                    data-v-0391810e
                  >2. If any provision of this agreement is deemed invalid or unenforceable, the above provisions can be severed and the remaining parts will still have legal effect.</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    3.
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> The waiver of the rights stipulated in this Agreement when the user is at fault or breach of contract shall not be deemed to be a waiver of the user's other or subsequent similar faults or breaches of contract.
                  </p>
                  <p
                    data-v-0391810e
                  >4. This Agreement shall supersede all previous oral and written agreements, arrangements, understandings and communications between the parties regarding any matter in this Agreement.</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    5.
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> has the right to transfer all rights and obligations under this agreement to its affiliated companies based on business adjustments. The transfer will be notified in the manner stipulated in this agreement, and the user promises not to object to this.
                  </p>
                </div>
                <div data-v-0391810e class="w-full flex flex-col gap-[0.8rem]">
                  <p
                    data-v-0391810e
                    class="text-[0.9rem] font-[700] leading-[1.35rem] text-[#252A34]"
                  >Sixteen, other</p>
                  <p data-v-0391810e class="p-highlight-processed">
                    If you have any comments or suggestions about this agreement or this service, you can contact
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> customer service, and
                    <span style="color: rgb(23, 138, 255);" class="p-highlight-processed">
                      <span style="color: rgb(23, 138, 255);">JingChat</span>
                    </span> will provide you with the necessary help.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!---->
        </div>
        <div style="  margin-top: 18px;  display: flex;justify-content: space-around;height: 35px;">  <el-button type="primary" plain style="padding: 4px;" @click="logOut">Delete account
        </el-button></div>
      </div>
    </el-dialog>
</template>
<script >
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
   
    };
  },
  watch: {
    dialogVisible(newVal, oldVal) {
      console.log("language changed:", newVal);
      // 这里写你语言变化后的逻辑
    }
  },
  mounted() {
    console.log("mounted language:", this.dialogVisible);
  },
  
  methods:{
    handleClose(){
        this.$emit('handleClose','false')
    },
    logOut(){
      // this.$router.push({ name: "Logout" });
      const routeUrl = this.$router.resolve({
        path: "/logout",
        query: { language: this.language},
      });
      window.open(routeUrl.href, "_blank");
    },
  }
};
</script>

<style lang="scss" scoped >
@import "./privacy.scss";

.header-inner {
}
</style>